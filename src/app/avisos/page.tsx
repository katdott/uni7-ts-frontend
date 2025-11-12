// src/app/avisos/page.tsx
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
import { AvisoService } from '../../services/aviso.service';
import type { Aviso, CreateAvisoDTO, UpdateAvisoDTO } from '../../types/aviso';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';

export default function AvisosPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAviso, setEditingAviso] = useState<Aviso | null>(null);
  const [formData, setFormData] = useState({ Nome: '', Descricao: '', IdUsuario: '1' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAvisos();
  }, []);

  const loadAvisos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AvisoService.getAll();
      setAvisos(data);
    } catch (err) {
      setError('Erro ao carregar avisos. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingAviso) {
        const updateData: UpdateAvisoDTO = {
          Nome: formData.Nome,
          Descricao: formData.Descricao,
        };
        await AvisoService.update(editingAviso.IdAviso, updateData);
      } else {
        const createData: CreateAvisoDTO = {
          IdUsuario: parseInt(formData.IdUsuario),
          Nome: formData.Nome,
          Descricao: formData.Descricao,
        };
        await AvisoService.create(createData);
      }
      setIsModalOpen(false);
      setFormData({ Nome: '', Descricao: '', IdUsuario: '1' });
      setEditingAviso(null);
      loadAvisos();
    } catch (err) {
      setError('Erro ao salvar aviso.');
      console.error(err);
    }
  };

  const handleEdit = (aviso: Aviso) => {
    setEditingAviso(aviso);
    setFormData({
      Nome: aviso.Nome,
      Descricao: aviso.Descricao,
      IdUsuario: aviso.IdUsuario.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este aviso?')) {
      try {
        await AvisoService.deactivate(id);
        loadAvisos();
      } catch (err) {
        setError('Erro ao excluir aviso.');
        console.error(err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingAviso(null);
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
          Avisos
        </Typography>
        <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={openCreateModal}>
          Novo Aviso
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : avisos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum aviso encontrado.
          </Typography>
          <Button variant="contained" color="secondary" onClick={openCreateModal} sx={{ mt: 2 }}>
            Criar primeiro aviso
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {avisos.map((aviso) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={aviso.IdAviso}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h3">
                      {aviso.Nome}
                    </Typography>
                    <Chip label="AVISO" color="primary" size="small" />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {aviso.Descricao}
                  </Typography>

                  <Box sx={{ borderTop: '1px dashed #aaa', pt: 2, mt: 2 }}>
                    <Typography variant="caption" display="block" color="text.secondary">
                      <strong>Usuário:</strong> {aviso.usuario?.NomeUsuario || 'Desconhecido'}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      <strong>Criado em:</strong> {formatDate(aviso.Inclusao)}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      <strong>Atualizado em:</strong> {formatDate(aviso.Atualizacao)}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions>
                  <Button size="small" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(aviso)}>
                    Editar
                  </Button>
                  <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(aviso.IdAviso)}>
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingAviso ? 'Editar Aviso' : 'Novo Aviso'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            {!editingAviso && (
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
              label="Nome do Aviso"
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
            {editingAviso ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </ProtectedRoute>
  );
}
