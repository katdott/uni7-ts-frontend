// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Paper,
  Avatar,
  Stack,
  IconButton,
  Chip,
  LinearProgress,
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '4px solid',
              borderColor: 'rgba(99, 102, 241, 0.1)',
              borderTopColor: 'primary.main',
              animation: 'rotate 1s linear infinite',
              mb: 3,
              mx: 'auto',
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Carregando Dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
          {isAuthenticated && user ? `Olá, ${user.nomeUsuario} 👋` : 'Dashboard'}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Box>

      {!stats ? (
        <Paper elevation={0} sx={{ p: 5, textAlign: 'center', borderRadius: '24px' }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Não foi possível carregar as estatísticas
          </Typography>
          <Button variant="contained" onClick={loadStats}>
            Tentar novamente
          </Button>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gridAutoRows: 'minmax(140px, auto)',
            gap: 3,
          }}
        >
          {/* Card Grande - Avisos Ativos (2x2) */}
          <Card
            elevation={0}
            sx={{
              gridColumn: { xs: 'span 1', md: 'span 2' },
              gridRow: { xs: 'span 1', md: 'span 2' },
              borderRadius: '32px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              color: 'white',
              p: 4,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
              },
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0px 24px 48px rgba(59, 130, 246, 0.4)',
              },
            }}
            onClick={() => router.push('/avisos')}
          >
            <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 'auto' }}>
                <Box>
                  <Chip
                    label="Em destaque"
                    size="small"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 700,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, opacity: 0.9 }}>
                    Avisos Ativos
                  </Typography>
                </Box>
                <IconButton sx={{ color: 'white' }}>
                  <CampaignIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Box>
              <Box>
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '5rem', lineHeight: 1 }}>
                  {stats.avisosAtivos}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  <TrendingUpIcon />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    +12% este mês
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Denúncias Abertas (1x1) */}
          <Card
            elevation={0}
            onClick={() => router.push('/denuncias')}
            sx={{
              gridColumn: 'span 1',
              gridRow: 'span 1',
              borderRadius: '24px',
              p: 3,
              background: (theme) => theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: 'rgba(239, 68, 68, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                boxShadow: '0px 12px 32px rgba(239, 68, 68, 0.2)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar sx={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', width: 48, height: 48 }}>
                <ReportProblemIcon />
              </Avatar>
              <ArrowForwardIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>
              {stats.denunciasAbertas}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              Denúncias Abertas
            </Typography>
          </Card>

          {/* Usuários Ativos (1x1) */}
          <Card
            elevation={0}
            sx={{
              gridColumn: 'span 1',
              gridRow: 'span 1',
              borderRadius: '24px',
              p: 3,
              background: (theme) => theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: 'rgba(34, 197, 94, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: 'rgba(34, 197, 94, 0.4)',
                boxShadow: '0px 12px 32px rgba(34, 197, 94, 0.2)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar sx={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', width: 48, height: 48 }}>
                <PeopleIcon />
              </Avatar>
              <MoreVertIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>
              {stats.usuariosAtivos}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              Moradores Ativos
            </Typography>
          </Card>

          {/* Taxa de Resolução (2x1) */}
          <Card
            elevation={0}
            sx={{
              gridColumn: { xs: 'span 1', md: 'span 2' },
              gridRow: 'span 1',
              borderRadius: '24px',
              p: 3,
              background: (theme) => theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: 'rgba(245, 158, 11, 0.2)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                  Taxa de Resolução
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Typography variant="h2" sx={{ fontWeight: 900, color: '#F59E0B' }}>
                    {stats.taxaResolucao}%
                  </Typography>
                  <Chip
                    icon={<TrendingUpIcon />}
                    label="+5%"
                    size="small"
                    sx={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', fontWeight: 700 }}
                  />
                </Box>
              </Box>
              <Avatar sx={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', width: 56, height: 56 }}>
                <CheckCircleIcon sx={{ fontSize: 32 }} />
              </Avatar>
            </Box>
            <LinearProgress
              variant="determinate"
              value={stats.taxaResolucao}
              sx={{
                height: 8,
                borderRadius: 4,
                background: 'rgba(245, 158, 11, 0.1)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                  borderRadius: 4,
                },
              }}
            />
          </Card>

          {/* Status das Denúncias (1x2) */}
          <Card
            elevation={0}
            sx={{
              gridColumn: 'span 1',
              gridRow: { xs: 'span 1', md: 'span 2' },
              borderRadius: '24px',
              p: 3,
              background: (theme) => theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: (theme) => theme.palette.mode === 'light'
                ? 'rgba(99, 102, 241, 0.1)'
                : 'rgba(129, 140, 248, 0.15)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Status
            </Typography>
            <Stack spacing={3}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Resolvidas
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {stats.denunciasPorStatus.Resolvida}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.denunciasPorStatus.Resolvida / stats.denunciasAbertas) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    background: 'rgba(34, 197, 94, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #22C55E 0%, #16A34A 100%)',
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Em Análise
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {stats.denunciasPorStatus['Em análise']}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.denunciasPorStatus['Em análise'] / stats.denunciasAbertas) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    background: 'rgba(245, 158, 11, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Abertas
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {stats.denunciasPorStatus.Aberta}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.denunciasPorStatus.Aberta / stats.denunciasAbertas) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    background: 'rgba(239, 68, 68, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #EF4444 0%, #DC2626 100%)',
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            </Stack>
          </Card>

          {/* Próximos Eventos (3x1) */}
          <Card
            elevation={0}
            sx={{
              gridColumn: { xs: 'span 1', md: 'span 3' },
              gridRow: 'span 1',
              borderRadius: '24px',
              p: 3,
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar sx={{ width: 64, height: 64, background: 'rgba(255, 255, 255, 0.2)' }}>
                <CalendarMonthIcon sx={{ fontSize: 36 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Próxima Assembleia
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                  15 de Março, 2024 às 19:00 - Sala de Reuniões
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  background: 'white',
                  color: '#6366F1',
                  fontWeight: 700,
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Ver Detalhes
              </Button>
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
}
