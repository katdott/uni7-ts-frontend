'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  Avatar,
  Button,
  Stack,
  Divider,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';

interface Notificacao {
  id: number;
  tipo: 'aviso' | 'denuncia' | 'evento';
  titulo: string;
  mensagem: string;
  lida: boolean;
  data: string;
}

export default function NotificacoesPage() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'todas' | 'nao-lidas'>('todas');
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});

  useEffect(() => {
    loadNotificacoes();
  }, []);

  const loadNotificacoes = useCallback(async () => {
    try {
      setLoading(true);
      
      // TODO: Quando a API de notificações estiver disponível, substituir por:
      // const response = await api.get('/notificacoes');
      // setNotificacoes(response.data);
      
      // Simulação temporária até a API estar disponível
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const tempNotificacoes: Notificacao[] = [
        {
          id: 1,
          tipo: 'aviso',
          titulo: 'Novo Aviso: Manutenção do Elevador',
          mensagem: 'Manutenção programada para amanhã das 8h às 17h.',
          lida: false,
          data: new Date().toISOString(),
        },
        {
          id: 2,
          tipo: 'denuncia',
          titulo: 'Sua denúncia foi analisada',
          mensagem: 'A denúncia #1234 foi resolvida pela administração.',
          lida: false,
          data: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 3,
          tipo: 'evento',
          titulo: 'Lembrete: Assembleia Condominial',
          mensagem: 'Assembleia acontece amanhã às 19h no salão de festas.',
          lida: true,
          data: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      
      setNotificacoes(tempNotificacoes);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl((prev) => ({ ...prev, [id]: event.currentTarget }));
  }, []);

  const handleMenuClose = useCallback((id: number) => {
    setAnchorEl((prev) => ({ ...prev, [id]: null }));
  }, []);

  const marcarComoLida = useCallback((id: number) => {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
    handleMenuClose(id);
  }, [handleMenuClose]);

  const excluirNotificacao = useCallback((id: number) => {
    setNotificacoes((prev) => prev.filter((n) => n.id !== id));
    handleMenuClose(id);
  }, [handleMenuClose]);

  const marcarTodasComoLidas = useCallback(() => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  }, []);

  const getIconByTipo = (tipo: string) => {
    switch (tipo) {
      case 'aviso':
        return <CampaignIcon />;
      case 'denuncia':
        return <ReportProblemIcon />;
      case 'evento':
        return <CalendarMonthIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getColorByTipo = (tipo: string) => {
    switch (tipo) {
      case 'aviso':
        return 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
      case 'denuncia':
        return 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
      case 'evento':
        return 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)';
      default:
        return 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)';
    }
  };

  const formatarData = (data: string) => {
    const date = new Date(data);
    const agora = new Date();
    const diff = agora.getTime() - date.getTime();
    const horas = Math.floor(diff / 3600000);
    
    if (horas < 1) return 'Agora mesmo';
    if (horas < 24) return `${horas}h atrás`;
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const notificacoesFiltradas = notificacoes.filter((n) =>
    filter === 'todas' ? true : !n.lida
  );

  if (loading) {
    return (
      <ProtectedRoute>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Notificações
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {notificacoes.filter((n) => !n.lida).length} não lidas
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setFilter(filter === 'todas' ? 'nao-lidas' : 'todas')}
            >
              {filter === 'todas' ? 'Todas' : 'Não lidas'}
            </Button>
            <Button
              variant="contained"
              startIcon={<DoneAllIcon />}
              onClick={marcarTodasComoLidas}
              disabled={notificacoes.every((n) => n.lida)}
            >
              Marcar todas como lidas
            </Button>
          </Stack>
        </Box>

        {/* Lista de Notificações */}
        {notificacoesFiltradas.length === 0 ? (
          <Card
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: '24px',
              background: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(30, 41, 59, 0.8)',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Tudo em dia!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Você não tem {filter === 'nao-lidas' ? 'notificações não lidas' : 'notificações'}.
            </Typography>
          </Card>
        ) : (
          <Stack spacing={2}>
            {notificacoesFiltradas.map((notificacao) => (
              <Card
                key={notificacao.id}
                elevation={0}
                sx={{
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: notificacao.lida ? 'divider' : 'primary.main',
                  background: (theme) =>
                    notificacao.lida
                      ? theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.6)'
                        : 'rgba(30, 41, 59, 0.6)'
                      : theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(30, 41, 59, 1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      sx={{
                        background: getColorByTipo(notificacao.tipo),
                        width: 48,
                        height: 48,
                      }}
                    >
                      {getIconByTipo(notificacao.tipo)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {notificacao.titulo}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {!notificacao.lida && (
                            <Chip
                              label="Nova"
                              size="small"
                              color="primary"
                              sx={{ fontWeight: 600, height: 24 }}
                            />
                          )}
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, notificacao.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl[notificacao.id]}
                            open={Boolean(anchorEl[notificacao.id])}
                            onClose={() => handleMenuClose(notificacao.id)}
                          >
                            {!notificacao.lida && (
                              <MenuItem onClick={() => marcarComoLida(notificacao.id)}>
                                <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                                Marcar como lida
                              </MenuItem>
                            )}
                            <MenuItem
                              onClick={() => excluirNotificacao(notificacao.id)}
                              sx={{ color: 'error.main' }}
                            >
                              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                              Excluir
                            </MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mb: 2 }}
                      >
                        {notificacao.mensagem}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.disabled', fontWeight: 500 }}
                      >
                        {formatarData(notificacao.data)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </ProtectedRoute>
  );
}
