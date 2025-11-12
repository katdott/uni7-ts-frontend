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
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
              <PersonAddIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h4" component="h1" gutterBottom>
                Criar Conta
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cadastre-se para acessar o sistema Uni7
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Conta criada com sucesso! Redirecionando para login...
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
                  disabled={loading || success}
                  helperText="Escolha um nome único para sua conta"
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
                  disabled={loading || success}
                  helperText="Mínimo de 6 caracteres"
                />

                <TextField
                  label="Confirmar Senha"
                  type="password"
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
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  disabled={loading || success}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Criando conta...' : 'Criar Conta'}
                </Button>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Já tem uma conta?{' '}
                    <Link
                      href="/login"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 500,
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
    </Container>
  );
}
