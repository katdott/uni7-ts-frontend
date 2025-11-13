'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
  Divider,
  Stack,
  Menu,
  MenuItem,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EventoService } from '@/services/evento.service';
import type { Evento } from '@/types/evento';
import { useToast } from '@/contexts/ToastContext';
import EventoModal from '@/components/Modals/EventoModal';
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; eventoId: number | null }>({
    open: false,
    eventoId: null,
  });
  const { showSuccess, showError } = useToast();

  const loadEventos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await EventoService.getAll();
      setEventos(data);
    } catch (err) {
      setError('Erro ao carregar eventos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEventos();
  }, [loadEventos]);

  const handleOpenModal = useCallback((evento?: Evento) => {
    setSelectedEvento(evento || null);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedEvento(null);
  }, []);

  const handleSuccess = useCallback(() => {
    loadEventos();
    showSuccess('Evento salvo com sucesso!');
  }, [loadEventos, showSuccess]);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>, eventoId: number) => {
    setAnchorEl((prev) => ({ ...prev, [eventoId]: event.currentTarget }));
  }, []);

  const handleMenuClose = useCallback((eventoId: number) => {
    setAnchorEl((prev) => ({ ...prev, [eventoId]: null }));
  }, []);

  const handleEdit = useCallback((evento: Evento) => {
    handleMenuClose(evento.idEvento);
    handleOpenModal(evento);
  }, [handleMenuClose, handleOpenModal]);

  const handleDeleteClick = useCallback((eventoId: number) => {
    handleMenuClose(eventoId);
    setConfirmDialog({ open: true, eventoId });
  }, [handleMenuClose]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!confirmDialog.eventoId) return;

    try {
      await EventoService.deactivate(confirmDialog.eventoId);
      loadEventos();
      showSuccess('Evento excluído com sucesso!');
    } catch (err) {
      showError('Erro ao excluir evento');
    } finally {
      setConfirmDialog({ open: false, eventoId: null });
    }
  }, [confirmDialog.eventoId, loadEventos, showSuccess, showError]);

  const formatDate = useMemo(() => (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }, []);

  const formatTime = useMemo(() => (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const getEventoColor = (dateString: string) => {
    const daysUntil = Math.ceil((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntil < 0) return '#6B7280'; // Passado
    if (daysUntil <= 3) return '#EF4444'; // Urgente
    if (daysUntil <= 7) return '#F59E0B'; // Próximo
    return '#3B82F6'; // Futuro
  };

  const sortedEventos = [...eventos].sort(
    (a, b) => new Date(a.dataEvento).getTime() - new Date(b.dataEvento).getTime()
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
            Eventos
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {eventos.length} {eventos.length === 1 ? 'evento agendado' : 'eventos agendados'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            size="small"
            sx={{
              background: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
            }}
          >
            <ToggleButton value="grid" sx={{ borderRadius: '12px' }}>
              <ViewModuleIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="list" sx={{ borderRadius: '12px' }}>
              <ViewListIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal()}
            sx={{
              borderRadius: '16px',
              px: 3,
              py: 1.5,
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              fontWeight: 700,
              '&:hover': {
                background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
              },
            }}
          >
            Novo Evento
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>
          {error}
        </Alert>
      )}

      {/* Grid/List de Eventos */}
      {viewMode === 'grid' ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {sortedEventos.map((evento) => (
            <Box key={evento.idEvento}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: '24px',
                  background: (theme) =>
                    theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid',
                  borderColor: `${getEventoColor(evento.dataEvento)}30`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: getEventoColor(evento.dataEvento),
                    boxShadow: `0px 12px 32px ${getEventoColor(evento.dataEvento)}40`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip
                      icon={<CalendarMonthIcon />}
                      label={isUpcoming(evento.dataEvento) ? 'Próximo' : 'Realizado'}
                      size="small"
                      sx={{
                        background: `${getEventoColor(evento.dataEvento)}20`,
                        color: getEventoColor(evento.dataEvento),
                        fontWeight: 700,
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, evento.idEvento)}
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: getEventoColor(evento.dataEvento),
                    }}
                  >
                    {evento.titulo}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {evento.descricao}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarMonthIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                        {formatDate(evento.dataEvento)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                        {formatTime(evento.dataEvento)}
                      </Typography>
                    </Box>

                    {evento.local && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                          {evento.local}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        <Stack spacing={2}>
          {sortedEventos.map((evento) => (
            <Card
              key={evento.idEvento}
              elevation={0}
              sx={{
                borderRadius: '20px',
                background: (theme) =>
                  theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'light' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(129, 140, 248, 0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(4px)',
                  boxShadow: '0px 8px 24px rgba(99, 102, 241, 0.12)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      minWidth: 80,
                      textAlign: 'center',
                      p: 2,
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, ${getEventoColor(evento.dataEvento)} 0%, ${getEventoColor(evento.dataEvento)}CC 100%)`,
                      color: 'white',
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1 }}>
                      {new Date(evento.dataEvento).getDate()}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                      {new Date(evento.dataEvento).toLocaleDateString('pt-BR', { month: 'short' })}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                      <Chip
                        label={isUpcoming(evento.dataEvento) ? 'Próximo' : 'Realizado'}
                        size="small"
                        sx={{
                          background: `${getEventoColor(evento.dataEvento)}20`,
                          color: getEventoColor(evento.dataEvento),
                          fontWeight: 700,
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, evento.idEvento)}
                        sx={{
                          background: (theme) =>
                            theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {evento.titulo}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      {evento.descricao}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                          {formatTime(evento.dataEvento)}
                        </Typography>
                      </Box>

                      {evento.local && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                            {evento.local}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {eventos.length === 0 && !loading && (
        <Card
          elevation={0}
          sx={{
            borderRadius: '24px',
            p: 6,
            textAlign: 'center',
            background: (theme) =>
              theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <CalendarMonthIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Nenhum evento agendado
          </Typography>
        </Card>
      )}

      {/* Menu de Ações */}
      {sortedEventos.map((evento) => (
        <Menu
          key={`menu-${evento.idEvento}`}
          anchorEl={anchorEl[evento.idEvento]}
          open={Boolean(anchorEl[evento.idEvento])}
          onClose={() => handleMenuClose(evento.idEvento)}
          PaperProps={{
            sx: {
              borderRadius: '12px',
              minWidth: 160,
            },
          }}
        >
          <MenuItem onClick={() => handleEdit(evento)}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Editar
          </MenuItem>
          <MenuItem
            onClick={() => handleDeleteClick(evento.idEvento)}
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Excluir
          </MenuItem>
        </Menu>
      ))}

      {/* Modal de Criar/Editar */}
      <EventoModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        evento={selectedEvento}
      />

      {/* Dialog de Confirmação */}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, eventoId: null })}
        onConfirm={handleDeleteConfirm}
        title="Excluir Evento"
        message="Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        severity="error"
      />
    </Box>
  );
}
