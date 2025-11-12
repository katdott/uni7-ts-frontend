// src/app/cadastro/page.tsx
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
  LinearProgress,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UsuarioService } from '../../services/usuario.service';
import type { CreateUsuarioDTO } from '../../types/usuario';

export default function CadastroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeUsuario: '',
    senha: '',
    confirmarSenha: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.senha);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validações
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const createData: CreateUsuarioDTO = {
        NomeUsuario: formData.nomeUsuario,
        Senha: formData.senha,
      };

      await UsuarioService.create(createData);
      setSuccess(true);

      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError('Nome de usuário já existe');
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
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
        background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
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
                  backgroundColor: 'secondary.main',
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
                  color: 'secondary.main',
                  mb: 2,
                  textAlign: 'center',
                }}
              >
                Junte-se a nós
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                  mb: 4,
                }}
              >
                Crie sua conta gratuitamente
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                  ✓ Acesso completo ao sistema
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  ✓ Interface moderna e fácil de usar
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  ✓ Gestão eficiente do condomínio
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ✓ Suporte dedicado
                </Typography>
              </Box>
            </Paper>

            {/* Right Side - Registration Form */}
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
                      backgroundColor: 'secondary.light' + '20',
                      borderRadius: '16px',
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <PersonAddIcon sx={{ fontSize: 48, color: 'secondary.main' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Criar Nova Conta
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Preencha os dados abaixo para começar
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert
                    severity="success"
                    icon={<CheckCircleIcon />}
                    sx={{ mb: 3, borderRadius: '12px' }}
                  >
                    Conta criada com sucesso! Redirecionando para login...
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
                      disabled={loading || success}
                      helperText="Escolha um nome único para sua conta"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box>
                      <TextField
                        label="Senha"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.senha}
                        onChange={(e) =>
                          setFormData({ ...formData, senha: e.target.value })
                        }
                        required
                        fullWidth
                        disabled={loading || success}
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
                      {formData.senha && (
                        <Box sx={{ mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <LinearProgress
                              variant="determinate"
                              value={passwordStrength}
                              sx={{
                                flexGrow: 1,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: '#E0E0E0',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 3,
                                  backgroundColor:
                                    passwordStrength < 50
                                      ? '#D32F2F'
                                      : passwordStrength < 75
                                      ? '#F57C00'
                                      : '#2E7D32',
                                },
                              }}
                            />
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Força da senha:{' '}
                            {passwordStrength < 50
                              ? 'Fraca'
                              : passwordStrength < 75
                              ? 'Média'
                              : 'Forte'}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <TextField
                      label="Confirmar Senha"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmarSenha}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmarSenha: e.target.value })
                      }
                      required
                      fullWidth
                      disabled={loading || success}
                      error={
                        formData.confirmarSenha !== '' &&
                        formData.senha !== formData.confirmarSenha
                      }
                      helperText={
                        formData.confirmarSenha !== '' &&
                        formData.senha !== formData.confirmarSenha
                          ? 'As senhas não coincidem'
                          : ''
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                      disabled={loading || success}
                      sx={{
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      {loading ? 'Criando conta...' : 'Criar Conta'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Já tem uma conta?{' '}
                        <Link
                          href="/login"
                          sx={{
                            color: 'secondary.main',
                            textDecoration: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          Faça login aqui
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
