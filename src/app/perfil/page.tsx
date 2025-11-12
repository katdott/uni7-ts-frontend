'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Paper,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Save as SaveIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { UsuarioService } from '@/services/usuario.service';
import { useAuth } from '@/hooks/useAuth';

export default function PerfilPage() {
  const router = useRouter();
  const { user, getRoleIcon, getRoleColor } = useAuth();
  
  const [nomeUsuario, setNomeUsuario] = useState(user?.nomeUsuario || '');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validações
    if (novaSenha && novaSenha !== confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (novaSenha && novaSenha.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (novaSenha && !senhaAtual) {
      setError('Digite sua senha atual para alterá-la');
      return;
    }

    try {
      setLoading(true);

      const updateData: any = {};
      
      if (nomeUsuario !== user?.nomeUsuario) {
        updateData.NomeUsuario = nomeUsuario;
      }

      if (novaSenha) {
        updateData.Senha = senhaAtual;
        updateData.NovaSenha = novaSenha;
      }

      if (Object.keys(updateData).length === 0) {
        setError('Nenhuma alteração foi feita');
        return;
      }

      const response = await UsuarioService.updateProfile(updateData);
      
      setSuccess(response.mensagem);
      
      // Atualizar nome no localStorage se mudou
      if (updateData.NomeUsuario) {
        const currentUser = JSON.parse(localStorage.getItem('usuario') || '{}');
        localStorage.setItem('usuario', JSON.stringify({
          ...currentUser,
          nomeUsuario: response.NomeUsuario
        }));
      }

      // Limpar campos de senha
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (err: any) {
      setError(err.response?.data?.erro || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PersonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <div>
            <Typography variant="h4" component="h1">
              Meu Perfil
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getRoleIcon()} {user.role || 'Morador'}
            </Typography>
          </div>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon /> Informações da Conta
              </Typography>
              
              <TextField
                fullWidth
                label="Nome de Usuário"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LockIcon /> Alterar Senha
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Deixe em branco se não quiser alterar a senha
              </Typography>

              <TextField
                fullWidth
                label="Senha Atual"
                type={showSenhaAtual ? 'text' : 'password'}
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                        edge="end"
                      >
                        {showSenhaAtual ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Nova Senha"
                type={showNovaSenha ? 'text' : 'password'}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                margin="normal"
                helperText="Mínimo 6 caracteres"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNovaSenha(!showNovaSenha)}
                        edge="end"
                      >
                        {showNovaSenha ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirmar Nova Senha"
                type={showConfirmarSenha ? 'text' : 'password'}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                margin="normal"
                error={novaSenha !== '' && confirmarSenha !== '' && novaSenha !== confirmarSenha}
                helperText={
                  novaSenha !== '' && confirmarSenha !== '' && novaSenha !== confirmarSenha
                    ? 'As senhas não coincidem'
                    : ''
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                        edge="end"
                      >
                        {showConfirmarSenha ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={<SaveIcon />}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
