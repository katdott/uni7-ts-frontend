// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import WarningIcon from '@mui/icons-material/Warning';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
            }}
          >
            Sistema Uni7
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 2,
            }}
          >
            Gestão de Avisos e Denúncias
          </Typography>
          {isAuthenticated && user && (
            <Typography
              variant="h6"
              sx={{
                color: 'secondary.main',
                fontWeight: 500,
              }}
            >
              Bem-vindo(a), {user.nomeUsuario}!
            </Typography>
          )}
        </Box>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                <AnnouncementIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" component="h2" gutterBottom>
                  Avisos
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Gerencie avisos importantes para a comunidade. Crie, edite e visualize todos os avisos.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => router.push('/avisos')}
                >
                  Acessar Avisos
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                <WarningIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
                <Typography variant="h4" component="h2" gutterBottom>
                  Denúncias
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Gerencie denúncias recebidas. Acompanhe, edite e tome ações sobre as denúncias.
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  size="large"
                  onClick={() => router.push('/denuncias')}
                >
                  Acessar Denúncias
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Sistema desenvolvido com Next.js + TypeScript + MUI Material
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
