// src/app/avisos/page.tsx
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import { AvisoService } from '../../services/aviso.service';
import type { Aviso, CreateAvisoDTO, UpdateAvisoDTO } from '../../types/aviso';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';
import { Stack } from '@mui/material';
import { useToast } from '@/contexts/ToastContext';
import AvisoModal from '@/components/Modals/AvisoModal';
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';

export default function AvisosPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [filteredAvisos, setFilteredAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAviso, setEditingAviso] = useState<Aviso | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; avisoId: number | null }>({
    open: false,
    avisoId: null,
  });
  const { showSuccess, showError } = useToast();

  const loadAvisos = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    loadAvisos();
  }, [loadAvisos]);

  // Filtro com debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = avisos.filter((aviso) =>
        aviso.Nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aviso.Descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAvisos(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, avisos]);

  const handleOpenModal = useCallback((aviso?: Aviso) => {
    setEditingAviso(aviso || null);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingAviso(null);
  }, []);

  const handleSuccess = useCallback(() => {
    loadAvisos();
    showSuccess('Aviso salvo com sucesso!');
  }, [loadAvisos, showSuccess]);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>, avisoId: number) => {
    setAnchorEl((prev) => ({ ...prev, [avisoId]: event.currentTarget }));
  }, []);

  const handleMenuClose = useCallback((avisoId: number) => {
    setAnchorEl((prev) => ({ ...prev, [avisoId]: null }));
  }, []);

  const handleEdit = useCallback((aviso: Aviso) => {
    handleMenuClose(aviso.IdAviso);
    handleOpenModal(aviso);
  }, [handleMenuClose, handleOpenModal]);

  const handleDeleteClick = useCallback((id: number) => {
    handleMenuClose(id);
    setConfirmDialog({ open: true, avisoId: id });
  }, [handleMenuClose]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!confirmDialog.avisoId) return;

    try {
      await AvisoService.deactivate(confirmDialog.avisoId);
      loadAvisos();
      showSuccess('Aviso excluído com sucesso!');
    } catch (err) {
      showError('Erro ao excluir aviso');
    } finally {
      setConfirmDialog({ open: false, avisoId: null });
    }
  }, [confirmDialog.avisoId, loadAvisos, showSuccess, showError]);

  const openCreateModal = useCallback(() => {
    handleOpenModal();
  }, [handleOpenModal]);

  const formatDate = useMemo(() => (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }, []);

  const formatDateTime = useMemo(() => (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  return (
    <ProtectedRoute>
      <Box 
        sx={{ 
          minHeight: 'calc(100vh - 72px)', 
          py: 4,
          background: (theme) => theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #F9FAFB 0%, #EEF2FF 100%)'
            : 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
        }}
      >
        <Container maxWidth="xl">
          {/* Header com Glassmorphism */}
          <Box 
            sx={{ 
              mb: 4,
              p: 3,
              borderRadius: '24px',
              background: (theme) => theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: (theme) => theme.palette.mode === 'light'
                ? 'rgba(99, 102, 241, 0.1)'
                : 'rgba(129, 140, 248, 0.2)',
              boxShadow: '0px 8px 32px rgba(99, 102, 241, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 0.5,
                    background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Avisos do Condomínio
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Gerencie e acompanhe todos os comunicados
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={openCreateModal}
                size="large"
                sx={{
                  borderRadius: '16px',
                  px: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                  boxShadow: '0px 4px 16px rgba(99, 102, 241, 0.3)',
                  fontWeight: 700,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0px 6px 20px rgba(99, 102, 241, 0.4)',
                  },
                }}
              >
                Novo Aviso
              </Button>
            </Box>

            {/* Toolbar com Glassmorphism */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 2.5, 
                mt: 3, 
                borderRadius: '20px',
                background: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(99, 102, 241, 0.1)'
                  : 'rgba(129, 140, 248, 0.2)',
                boxShadow: '0px 4px 24px rgba(99, 102, 241, 0.08)',
              }}
            >
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
                      borderLeft: '4px solid #1976D2',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            icon={<CampaignIcon />}
                            label="ATIVO"
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                          {aviso.DataEvento && (
                            <Chip
                              icon={<EventIcon />}
                              label="Com Evento"
                              color="secondary"
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Stack>
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
                          <MenuItem onClick={() => handleDeleteClick(aviso.IdAviso)} sx={{ color: 'error.main' }}>
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
                        {aviso.DataEvento && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EventIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                            <Typography variant="caption" color="secondary.main" sx={{ fontWeight: 600 }}>
                              Evento: {formatDateTime(aviso.DataEvento)}
                            </Typography>
                          </Box>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {aviso.usuario?.NomeUsuario || 'Desconhecido'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            Publicado em {formatDate(aviso.Inclusao)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                      <Button size="small" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(aviso)} fullWidth>
                        Gerenciar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredAvisos.map((aviso) => (
                <Card key={aviso.IdAviso} sx={{ borderLeft: '4px solid #1976D2' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                          <Chip icon={<CampaignIcon />} label="ATIVO" color="primary" size="small" />
                          {aviso.DataEvento && (
                            <Chip
                              icon={<EventIcon />}
                              label="Com Evento"
                              color="secondary"
                              size="small"
                              variant="outlined"
                            />
                          )}
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {aviso.Nome}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {aviso.Descricao}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                          {aviso.DataEvento && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <EventIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                              <Typography variant="caption" color="secondary.main" sx={{ fontWeight: 600 }}>
                                Evento: {formatDateTime(aviso.DataEvento)}
                              </Typography>
                            </Box>
                          )}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {aviso.usuario?.NomeUsuario || 'Desconhecido'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              Publicado em {formatDateTime(aviso.Inclusao)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton color="primary" onClick={() => handleEdit(aviso)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteClick(aviso.IdAviso)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* Modal de Criar/Editar */}
          <AvisoModal
            open={isModalOpen}
            onClose={handleCloseModal}
            onSuccess={handleSuccess}
            aviso={editingAviso}
          />

          <ConfirmDialog
            open={confirmDialog.open}
            onClose={() => setConfirmDialog({ open: false, avisoId: null })}
            onConfirm={handleDeleteConfirm}
            title="Excluir Aviso"
            message="Tem certeza que deseja excluir este aviso? Esta ação não pode ser desfeita."
            confirmText="Excluir"
            cancelText="Cancelar"
            severity="error"
          />
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
