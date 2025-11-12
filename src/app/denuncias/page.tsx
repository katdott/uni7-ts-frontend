// src/app/denuncias/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DenunciaService } from '../../services/denuncia.service';
import type { Denuncia, CreateDenunciaDTO, UpdateDenunciaDTO } from '../../types/denuncia';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';

export default function DenunciasPage() {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDenuncia, setEditingDenuncia] = useState<Denuncia | null>(null);
  const [formData, setFormData] = useState({ Nome: '', Descricao: '', IdUsuario: '1' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDenuncias();
  }, []);

  const loadDenuncias = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DenunciaService.getAll();
      setDenuncias(data);
    } catch (err) {
      setError('Erro ao carregar denúncias. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingDenuncia) {
        const updateData: UpdateDenunciaDTO = {
          Nome: formData.Nome,
          Descricao: formData.Descricao,
        };
        await DenunciaService.update(editingDenuncia.IdDenuncia, updateData);
      } else {
        const createData: CreateDenunciaDTO = {
          IdUsuario: parseInt(formData.IdUsuario),
          Nome: formData.Nome,
          Descricao: formData.Descricao,
        };
        await DenunciaService.create(createData);
      }
      setIsModalOpen(false);
      setFormData({ Nome: '', Descricao: '', IdUsuario: '1' });
      setEditingDenuncia(null);
      loadDenuncias();
    } catch (err) {
      setError('Erro ao salvar denúncia.');
      console.error(err);
    }
  };

  const handleEdit = (denuncia: Denuncia) => {
    setEditingDenuncia(denuncia);
    setFormData({
      Nome: denuncia.Nome,
      Descricao: denuncia.Descricao,
      IdUsuario: denuncia.IdUsuario.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta denúncia?')) {
      try {
        await DenunciaService.deactivate(id);
        loadDenuncias();
      } catch (err) {
        setError('Erro ao excluir denúncia.');
        console.error(err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingDenuncia(null);
    setFormData({ Nome: '', Descricao: '', IdUsuario: '1' });
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ProtectedRoute>
      <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" color="text.secondary">
          Denúncias
        </Typography>
        <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={openCreateModal}>
          Nova Denúncia
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : denuncias.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhuma denúncia encontrada.
          </Typography>
          <Button variant="contained" color="secondary" onClick={openCreateModal} sx={{ mt: 2 }}>
            Criar primeira denúncia
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {denuncias.map((denuncia) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={denuncia.IdDenuncia}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h3">
                      {denuncia.Nome}
                    </Typography>
                    <Chip label="DENÚNCIA" color="error" size="small" />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {denuncia.Descricao}
                  </Typography>

                  <Box sx={{ borderTop: '1px dashed #aaa', pt: 2, mt: 2 }}>
                    <Typography variant="caption" display="block" color="text.secondary">
                      <strong>Usuário:</strong> {denuncia.usuario?.NomeUsuario || 'Desconhecido'}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      <strong>Criado em:</strong> {formatDate(denuncia.Inclusao)}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      <strong>Atualizado em:</strong> {formatDate(denuncia.Atualizacao)}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions>
                  <Button size="small" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(denuncia)}>
                    Editar
                  </Button>
                  <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(denuncia.IdDenuncia)}>
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingDenuncia ? 'Editar Denúncia' : 'Nova Denúncia'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            {!editingDenuncia && (
              <TextField
                label="ID do Usuário"
                type="number"
                value={formData.IdUsuario}
                onChange={(e) => setFormData({ ...formData, IdUsuario: e.target.value })}
                required
                fullWidth
              />
            )}
            <TextField
              label="Nome da Denúncia"
              value={formData.Nome}
              onChange={(e) => setFormData({ ...formData, Nome: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Descrição"
              value={formData.Descricao}
              onChange={(e) => setFormData({ ...formData, Descricao: e.target.value })}
              required
              multiline
              rows={6}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            {editingDenuncia ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </ProtectedRoute>
  );
}
