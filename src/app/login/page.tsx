// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { AuthService } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    nomeUsuario: '',
    senha: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await AuthService.login({
        NomeUsuario: formData.nomeUsuario,
        Senha: formData.senha,
      });

      // Decodificar token para extrair role
      const token = response.token;
      let role: any = 'Morador'; // default
      
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          role = payload.role || 'Morador';
        } catch (e) {
          console.error('Erro ao decodificar token:', e);
        }
      }

      login({
        nomeUsuario: response.NomeUsuario,
        email: response.Email,
        role,
        loggedIn: true,
      });

      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', gap: 4, width: '100%', maxWidth: 1000, alignItems: 'center' }}>
            {/* Left Side - Branding */}
            <Paper
              sx={{
                flex: 1,
                p: 6,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                minHeight: 500,
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  borderRadius: '20px',
                  p: 3,
                  mb: 3,
                }}
              >
                <ApartmentIcon sx={{ fontSize: 80, color: 'white' }} />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 2,
                  textAlign: 'center',
                }}
              >
                CondoManager
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                  mb: 4,
                }}
              >
                Sistema de Gestão Condominial
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                  ✓ Gerencie avisos e comunicados
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  ✓ Acompanhe denúncias e ocorrências
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  ✓ Dashboard com estatísticas em tempo real
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ✓ Interface moderna e intuitiva
                </Typography>
              </Box>
            </Paper>

            {/* Right Side - Login Form */}
            <Card
              sx={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                boxShadow: '0px 20px 60px rgba(0,0,0,0.3)',
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      backgroundColor: 'primary.light' + '20',
                      borderRadius: '16px',
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <LoginIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Bem-vindo de volta!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Entre com suas credenciais para acessar o sistema
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                      label="Nome de Usuário"
                      value={formData.nomeUsuario}
                      onChange={(e) =>
                        setFormData({ ...formData, nomeUsuario: e.target.value })
                      }
                      required
                      fullWidth
                      autoFocus
                      disabled={loading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="Senha"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.senha}
                      onChange={(e) =>
                        setFormData({ ...formData, senha: e.target.value })
                      }
                      required
                      fullWidth
                      disabled={loading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      {loading ? 'Entrando...' : 'Entrar no Sistema'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Não tem uma conta?{' '}
                        <Link
                          href="/cadastro"
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          Cadastre-se gratuitamente
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
