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
  Stack,
  CircularProgress,
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
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
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 70px)' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100vh - 70px)', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            {isAuthenticated && user
              ? `Bem-vindo, ${user.nomeUsuario}! 👋`
              : 'Dashboard - CondoManager'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Visão geral do condomínio
          </Typography>
        </Box>

        {!stats ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '16px' }}>
            <Typography variant="h6" color="text.secondary">
              Não foi possível carregar as estatísticas
            </Typography>
            <Button variant="contained" onClick={loadStats} sx={{ mt: 2 }}>
              Tentar novamente
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {/* Stats Cards */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ borderRadius: '16px', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#E3F2FD', color: '#1565C0', width: 56, height: 56 }}>
                      <CampaignIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Avisos Ativos
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.avisosAtivos}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ borderRadius: '16px', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#FFEBEE', color: '#D32F2F', width: 56, height: 56 }}>
                      <ReportProblemIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Denúncias Abertas
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.denunciasAbertas}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ borderRadius: '16px', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', width: 56, height: 56 }}>
                      <PeopleIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Usuários Ativos
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.usuariosAtivos}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ borderRadius: '16px', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#FFF3E0', color: '#F57C00', width: 56, height: 56 }}>
                      <CheckCircleIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Taxa de Resolução
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.taxaResolucao}%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Quick Actions */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper sx={{ p: 3, borderRadius: '16px' }}>
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
                        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
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
                              Ver Avisos
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              Comunicados e informações
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
                        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
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
                              Ver Denúncias
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
            </Grid>

            {/* Status Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3, borderRadius: '16px' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Status das Denúncias
                </Typography>
                <Stack spacing={3}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon sx={{ fontSize: 20, color: 'success.main' }} />
                        <Typography variant="body2" color="text.secondary">
                          Resolvidas
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {stats.denunciasPorStatus.Resolvida}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mt: 2 }} />

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PendingActionsIcon sx={{ fontSize: 20, color: 'warning.main' }} />
                        <Typography variant="body2" color="text.secondary">
                          Em análise
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {stats.denunciasPorStatus['Em análise']}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mt: 2 }} />

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <NotificationsActiveIcon sx={{ fontSize: 20, color: 'error.main' }} />
                        <Typography variant="body2" color="text.secondary">
                          Abertas
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {stats.denunciasPorStatus.Aberta}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
