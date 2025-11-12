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
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await AuthService.login({
        NomeUsuario: formData.nomeUsuario,
        Senha: formData.senha,
      });

      login({
        nomeUsuario: user.NomeUsuario,
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
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <LoginIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" component="h1" gutterBottom>
                Entrar no Sistema
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Faça login para acessar o sistema Uni7
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                />

                <TextField
                  label="Senha"
                  type="password"
                  value={formData.senha}
                  onChange={(e) =>
                    setFormData({ ...formData, senha: e.target.value })
                  }
                  required
                  fullWidth
                  disabled={loading}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Não tem uma conta?{' '}
                    <Link
                      href="/cadastro"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Cadastre-se aqui
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
