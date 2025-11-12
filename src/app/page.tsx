// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Paper,
  Avatar,
  Chip,
  Stack,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '@/hooks/useAuth';
import { DashboardService, DashboardStats } from '@/services/dashboard.service';

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await DashboardService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Dados mock apenas para demonstração quando não há dados
  const statsCards = stats ? [
    {
      title: 'Avisos Ativos',
      value: stats.avisosAtivos.toString(),
      change: '+12%',
      icon: CampaignIcon,
      color: '#1565C0',
      bgColor: '#E3F2FD',
      trend: 'up',
    },
    {
      title: 'Denúncias Abertas',
      value: stats.denunciasAbertas.toString(),
      change: '-5%',
      icon: ReportProblemIcon,
      color: '#D32F2F',
      bgColor: '#FFEBEE',
      trend: 'down',
    },
    {
      title: 'Usuários Ativos',
      value: stats.usuariosAtivos.toString(),
      change: '+8%',
      icon: PeopleIcon,
      color: '#2E7D32',
      bgColor: '#E8F5E9',
      trend: 'up',
    },
    {
      title: 'Taxa de Resolução',
      value: `${stats.taxaResolucao}%`,
      change: '+3%',
      icon: TrendingUpIcon,
      color: '#F57C00',
      bgColor: '#FFF3E0',
      trend: 'up',
    },
  ] : [];

  const recentActivity = [
    {
      id: 1,
      type: 'aviso',
      title: 'Manutenção do Elevador',
      status: 'Ativo',
      time: 'Há 2 horas',
    },
    {
      id: 2,
      type: 'denuncia',
      title: 'Barulho excessivo - Apto 301',
      status: 'Em análise',
      time: 'Há 4 horas',
    },
    {
      id: 3,
      type: 'aviso',
      title: 'Reunião de Condôminos',
      status: 'Agendado',
      time: 'Há 1 dia',
    },
  ];

  const quickStats = stats ? [
    { label: 'Resolvidas', value: stats.denunciasPorStatus.Resolvida.toString(), icon: CheckCircleIcon, color: 'success' },
    { label: 'Em análise', value: stats.denunciasPorStatus['Em análise'].toString(), icon: PendingActionsIcon, color: 'warning' },
    { label: 'Abertas', value: stats.denunciasPorStatus.Aberta.toString(), icon: NotificationsActiveIcon, color: 'error' },
  ] : [];

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 70px)', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 1,
            }}
          >
            {isAuthenticated && user
              ? `Bem-vindo de volta, ${user.nomeUsuario}! 👋`
              : 'Dashboard - CondoManager'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
            }}
          >
            Visão geral do condomínio e atividades recentes
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {loading ? (
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Grid>
          ) : statsCards.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, fontWeight: 500 }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}
                      >
                        {stat.value}
                      </Typography>
                      <Chip
                        label={stat.change}
                        size="small"
                        sx={{
                          backgroundColor: stat.trend === 'up' ? '#E8F5E9' : '#FFEBEE',
                          color: stat.trend === 'up' ? '#2E7D32' : '#D32F2F',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: stat.bgColor,
                        width: 56,
                        height: 56,
                      }}
                    >
                      <stat.icon sx={{ color: stat.color, fontSize: 28 }} />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, borderRadius: '16px', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Ações Rápidas
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                    onClick={() => router.push('/avisos')}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 48, height: 48 }}>
                          <CampaignIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Gerenciar Avisos
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Criar e editar comunicados
                          </Typography>
                        </Box>
                        <ArrowForwardIcon />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: 'white',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                    onClick={() => router.push('/denuncias')}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 48, height: 48 }}>
                          <ReportProblemIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Gerenciar Denúncias
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Acompanhar ocorrências
                          </Typography>
                        </Box>
                        <ArrowForwardIcon />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>

            {/* Recent Activity */}
            <Paper sx={{ p: 3, borderRadius: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Atividades Recentes
              </Typography>
              <Stack spacing={2}>
                {recentActivity.map((activity) => (
                  <Box
                    key={activity.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: activity.type === 'aviso' ? '#E3F2FD' : '#FFEBEE',
                        color: activity.type === 'aviso' ? '#1565C0' : '#D32F2F',
                        mr: 2,
                      }}
                    >
                      {activity.type === 'aviso' ? <CampaignIcon /> : <ReportProblemIcon />}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {activity.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                    <Chip
                      label={activity.status}
                      size="small"
                      color={activity.type === 'aviso' ? 'primary' : 'error'}
                      variant="outlined"
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Sidebar Stats */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: '16px', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Resumo Rápido
              </Typography>
              <Stack spacing={3}>
                {quickStats.map((stat, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <stat.icon sx={{ fontSize: 20, color: `${stat.color}.main` }} />
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    {index < quickStats.length - 1 && <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mt: 2 }} />}
                  </Box>
                ))}
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Performance Mensal
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Meta de resolução: 90%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={94}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  mb: 1,
                  backgroundColor: '#E0E0E0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    backgroundColor: '#2E7D32',
                  },
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', mt: 2 }}>
                94%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Excelente desempenho! 🎉
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {!isAuthenticated && (
          <Paper
            sx={{
              mt: 4,
              p: 4,
              textAlign: 'center',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Faça login para acessar todas as funcionalidades
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/login')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Entrar no Sistema
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
