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
        background: (theme) => theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)'
          : 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
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
            {/* Left Side - Branding com Glassmorphism e Animações */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 6,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px',
                minHeight: 550,
                border: '1px solid',
                borderColor: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(99, 102, 241, 0.1)'
                  : 'rgba(129, 140, 248, 0.2)',
                boxShadow: '0px 20px 60px rgba(99, 102, 241, 0.15)',
                animation: 'slideInLeft 0.8s ease-out',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-100%',
                  left: '-100%',
                  width: '300%',
                  height: '300%',
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                  animation: 'rotate 20s linear infinite',
                },
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                  borderRadius: '24px',
                  p: 3.5,
                  mb: 3,
                  boxShadow: '0px 8px 24px rgba(99, 102, 241, 0.3)',
                  animation: 'float 3s ease-in-out infinite',
                  position: 'relative',
                  zIndex: 1,
                  '&:hover': {
                    animation: 'float 1.5s ease-in-out infinite',
                  },
                }}
              >
                <ApartmentIcon sx={{ fontSize: 90, color: 'white' }} />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  textAlign: 'center',
                  letterSpacing: '-0.02em',
                }}
              >
                CondoManager
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                  mb: 5,
                  fontWeight: 600,
                }}
              >
                Sistema de Gestão Condominial
              </Typography>
              <Box sx={{ textAlign: 'left', width: '100%' }}>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5,
                    fontWeight: 500,
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)' 
                    }} 
                  />
                  Gerencie avisos e comunicados
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5,
                    fontWeight: 500,
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)' 
                    }} 
                  />
                  Acompanhe denúncias e ocorrências
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5,
                    fontWeight: 500,
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)' 
                    }} 
                  />
                  Dashboard com estatísticas em tempo real
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5,
                    fontWeight: 500,
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)' 
                    }} 
                  />
                  Interface moderna e intuitiva
                </Typography>
              </Box>
            </Paper>

            {/* Right Side - Login Form com Glassmorphism e Animações */}
            <Card
              elevation={0}
              sx={{
                flex: 1,
                background: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.85)'
                  : 'rgba(30, 41, 59, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid',
                borderColor: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(99, 102, 241, 0.1)'
                  : 'rgba(129, 140, 248, 0.2)',
                boxShadow: '0px 20px 60px rgba(99, 102, 241, 0.2)',
                animation: 'slideInRight 0.8s ease-out',
              }}
            >
              <CardContent sx={{ p: 6 }}>
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      background: (theme) => theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                      borderRadius: '20px',
                      p: 2.5,
                      mb: 3,
                      border: '1px solid',
                      borderColor: 'rgba(99, 102, 241, 0.2)',
                    }}
                  >
                    <LoginIcon 
                      sx={{ 
                        fontSize: 56, 
                        background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }} 
                    />
                  </Box>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 800, 
                      mb: 1.5,
                      background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Bem-vindo de volta!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Entre com suas credenciais para acessar o sistema
                  </Typography>
                </Box>

                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3, 
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      fontWeight: 500,
                    }}
                  >
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
                            <PersonIcon sx={{ color: 'primary.main' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '16px',
                          background: (theme) => theme.palette.mode === 'light'
                            ? 'rgba(99, 102, 241, 0.03)'
                            : 'rgba(129, 140, 248, 0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: (theme) => theme.palette.mode === 'light'
                              ? 'rgba(99, 102, 241, 0.05)'
                              : 'rgba(129, 140, 248, 0.08)',
                            transform: 'translateY(-2px)',
                          },
                          '&.Mui-focused': {
                            background: (theme) => theme.palette.mode === 'light'
                              ? 'rgba(99, 102, 241, 0.08)'
                              : 'rgba(129, 140, 248, 0.1)',
                            boxShadow: '0px 4px 16px rgba(99, 102, 241, 0.2)',
                          },
                        },
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
                            <LockIcon sx={{ color: 'primary.main' }} />
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '16px',
                          background: (theme) => theme.palette.mode === 'light'
                            ? 'rgba(99, 102, 241, 0.03)'
                            : 'rgba(129, 140, 248, 0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: (theme) => theme.palette.mode === 'light'
                              ? 'rgba(99, 102, 241, 0.05)'
                              : 'rgba(129, 140, 248, 0.08)',
                            transform: 'translateY(-2px)',
                          },
                          '&.Mui-focused': {
                            background: (theme) => theme.palette.mode === 'light'
                              ? 'rgba(99, 102, 241, 0.08)'
                              : 'rgba(129, 140, 248, 0.1)',
                            boxShadow: '0px 4px 16px rgba(99, 102, 241, 0.2)',
                          },
                        },
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
                        py: 1.8,
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                        boxShadow: '0px 8px 24px rgba(99, 102, 241, 0.3)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: 0,
                          height: 0,
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.3)',
                          transform: 'translate(-50%, -50%)',
                          transition: 'width 0.6s, height 0.6s',
                        },
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
                          transform: 'translateY(-2px) scale(1.02)',
                          boxShadow: '0px 12px 32px rgba(99, 102, 241, 0.4)',
                          '&::before': {
                            width: '300px',
                            height: '300px',
                          },
                        },
                        '&:active': {
                          transform: 'translateY(0) scale(0.98)',
                        },
                      }}
                    >
                      {loading ? 'Entrando...' : 'Entrar no Sistema'}
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Não tem uma conta?{' '}
                        <Link
                          href="/cadastro"
                          sx={{
                            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textDecoration: 'none',
                            fontWeight: 700,
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
