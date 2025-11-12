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
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { AvisoService } from '../../services/aviso.service';
import type { Aviso, CreateAvisoDTO, UpdateAvisoDTO } from '../../types/aviso';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';

export default function AvisosPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [filteredAvisos, setFilteredAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAviso, setEditingAviso] = useState<Aviso | null>(null);
  const [formData, setFormData] = useState({ Nome: '', Descricao: '', IdUsuario: '1' });
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});

  useEffect(() => {
    loadAvisos();
  }, []);

  useEffect(() => {
    const filtered = avisos.filter((aviso) =>
      aviso.Nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aviso.Descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAvisos(filtered);
  }, [searchTerm, avisos]);

  const loadAvisos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AvisoService.getAll();
      setAvisos(data);
      setFilteredAvisos(data);
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
    handleMenuClose(aviso.IdAviso);
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
    handleMenuClose(id);
  };

  const openCreateModal = () => {
    setEditingAviso(null);
    setFormData({ Nome: '', Descricao: '', IdUsuario: '1' });
    setIsModalOpen(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
  };

  const handleMenuClose = (id: number) => {
    setAnchorEl({ ...anchorEl, [id]: null });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
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
      <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 70px)', py: 4 }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                  Avisos do Condomínio
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gerencie e acompanhe todos os comunicados
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={openCreateModal}
                size="large"
              >
                Novo Aviso
              </Button>
            </Box>

            {/* Toolbar */}
            <Paper sx={{ p: 2, mt: 3, borderRadius: '12px' }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                  placeholder="Buscar avisos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  sx={{ flexGrow: 1, minWidth: 250 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Tooltip title="Filtros">
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
                <Divider orientation="vertical" flexItem />
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, newMode) => newMode && setViewMode(newMode)}
                  size="small"
                >
                  <ToggleButton value="grid">
                    <ViewModuleIcon fontSize="small" />
                  </ToggleButton>
                  <ToggleButton value="list">
                    <ViewListIcon fontSize="small" />
                  </ToggleButton>
                </ToggleButtonGroup>
                <Chip
                  label={`${filteredAvisos.length} ${filteredAvisos.length === 1 ? 'aviso' : 'avisos'}`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Paper>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : filteredAvisos.length === 0 ? (
            <Paper sx={{ textAlign: 'center', py: 8, borderRadius: '16px' }}>
              <CampaignIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {searchTerm ? 'Nenhum aviso encontrado' : 'Nenhum aviso cadastrado'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchTerm ? 'Tente buscar com outros termos' : 'Comece criando seu primeiro aviso'}
              </Typography>
              {!searchTerm && (
                <Button variant="contained" color="primary" onClick={openCreateModal} startIcon={<AddIcon />}>
                  Criar Primeiro Aviso
                </Button>
              )}
            </Paper>
          ) : viewMode === 'grid' ? (
            <Grid container spacing={3}>
              {filteredAvisos.map((aviso) => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={aviso.IdAviso}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Chip
                          icon={<CampaignIcon />}
                          label="ATIVO"
                          color="primary"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, aviso.IdAviso)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl[aviso.IdAviso]}
                          open={Boolean(anchorEl[aviso.IdAviso])}
                          onClose={() => handleMenuClose(aviso.IdAviso)}
                        >
                          <MenuItem onClick={() => handleEdit(aviso)}>
                            <EditIcon fontSize="small" sx={{ mr: 1 }} />
                            Editar
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(aviso.IdAviso)} sx={{ color: 'error.main' }}>
                            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                            Excluir
                          </MenuItem>
                        </Menu>
                      </Box>

                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: 'text.primary' }}>
                        {aviso.Nome}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {aviso.Descricao}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {aviso.usuario?.NomeUsuario || 'Desconhecido'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(aviso.Inclusao)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                      <Button size="small" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(aviso)} fullWidth>
                        Editar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredAvisos.map((aviso) => (
                <Card key={aviso.IdAviso}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Chip icon={<CampaignIcon />} label="ATIVO" color="primary" size="small" />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {aviso.Nome}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {aviso.Descricao}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {aviso.usuario?.NomeUsuario || 'Desconhecido'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              Criado em {formatDateTime(aviso.Inclusao)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton color="primary" onClick={() => handleEdit(aviso)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(aviso.IdAviso)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* Modal */}
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
              {editingAviso ? 'Editar Aviso' : 'Novo Aviso'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
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
                  label="Título do Aviso"
                  value={formData.Nome}
                  onChange={(e) => setFormData({ ...formData, Nome: e.target.value })}
                  required
                  fullWidth
                  placeholder="Ex: Manutenção do elevador"
                />
                <TextField
                  label="Descrição"
                  value={formData.Descricao}
                  onChange={(e) => setFormData({ ...formData, Descricao: e.target.value })}
                  required
                  multiline
                  rows={6}
                  fullWidth
                  placeholder="Descreva os detalhes do aviso..."
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={() => setIsModalOpen(false)} color="inherit">
                Cancelar
              </Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                {editingAviso ? 'Atualizar Aviso' : 'Criar Aviso'}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
