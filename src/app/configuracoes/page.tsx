'use client';

import { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  TextField,
  Stack,
  Alert,
  IconButton,
  Chip,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import PaletteIcon from '@mui/icons-material/Palette';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/contexts/ToastContext';

export default function ConfiguracoesPage() {
  const { user } = useAuth();
  const { showSuccess, showInfo } = useToast();
  
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [nome, setNome] = useState(user?.nomeUsuario || '');
  const [email, setEmail] = useState(user?.email || '');
  const [telefone, setTelefone] = useState('');
  
  const [notificacoes, setNotificacoes] = useState({
    avisos: true,
    denuncias: true,
    eventos: true,
    email: false,
    push: true,
  });

  const [tema, setTema] = useState<'light' | 'dark' | 'auto'>('auto');

  const handleSalvarPerfil = useCallback(() => {
    // Aqui você faria a chamada à API para salvar
    showSuccess('Perfil atualizado com sucesso!');
    setEditandoPerfil(false);
  }, [showSuccess]);

  const handleNotificacaoChange = useCallback((campo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificacoes((prev) => ({
      ...prev,
      [campo]: event.target.checked,
    }));
    showInfo('Preferências de notificação atualizadas');
  }, [showInfo]);

  const handleTemaChange = useCallback((novoTema: 'light' | 'dark' | 'auto') => {
    setTema(novoTema);
    showInfo(`Tema alterado para ${novoTema === 'light' ? 'claro' : novoTema === 'dark' ? 'escuro' : 'automático'}`);
  }, [showInfo]);

  return (
    <ProtectedRoute>
      <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Configurações
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Gerencie suas preferências e informações pessoais
          </Typography>
        </Box>

        <Stack spacing={3}>
          {/* Perfil */}
          <Card
            elevation={0}
            sx={{
              borderRadius: '24px',
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'visible',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Perfil
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Suas informações pessoais
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  color={editandoPerfil ? 'primary' : 'default'}
                  onClick={() => setEditandoPerfil(!editandoPerfil)}
                >
                  <EditIcon />
                </IconButton>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3}>
                <TextField
                  label="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={!editandoPerfil}
                  fullWidth
                />
                <TextField
                  label="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editandoPerfil}
                  fullWidth
                  type="email"
                />
                <TextField
                  label="Telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  disabled={!editandoPerfil}
                  fullWidth
                  placeholder="(00) 00000-0000"
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={`Perfil: ${user?.role || 'Morador'}`} color="primary" />
                  <Chip
                    label="Ativo"
                    color="success"
                  />
                </Box>
              </Stack>

              {editandoPerfil && (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSalvarPerfil}
                  >
                    Salvar Alterações
                  </Button>
                  <Button variant="outlined" onClick={() => setEditandoPerfil(false)}>
                    Cancelar
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card
            elevation={0}
            sx={{
              borderRadius: '24px',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Notificações
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Escolha quais notificações deseja receber
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoes.avisos}
                      onChange={handleNotificacaoChange('avisos')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Avisos
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Receba notificações sobre novos avisos do condomínio
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoes.denuncias}
                      onChange={handleNotificacaoChange('denuncias')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Denúncias
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Atualizações sobre suas denúncias
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoes.eventos}
                      onChange={handleNotificacaoChange('eventos')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Eventos
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Lembretes de eventos e assembleias
                      </Typography>
                    </Box>
                  }
                />
                <Divider />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoes.email}
                      onChange={handleNotificacaoChange('email')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        E-mail
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Receber notificações por e-mail
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoes.push}
                      onChange={handleNotificacaoChange('push')}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Push
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Notificações push no navegador
                      </Typography>
                    </Box>
                  }
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Aparência */}
          <Card
            elevation={0}
            sx={{
              borderRadius: '24px',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                  }}
                >
                  <PaletteIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Aparência
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Personalize a interface do sistema
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                Tema
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant={tema === 'light' ? 'contained' : 'outlined'}
                  onClick={() => handleTemaChange('light')}
                  sx={{ flex: 1 }}
                >
                  Claro
                </Button>
                <Button
                  variant={tema === 'dark' ? 'contained' : 'outlined'}
                  onClick={() => handleTemaChange('dark')}
                  sx={{ flex: 1 }}
                >
                  Escuro
                </Button>
                <Button
                  variant={tema === 'auto' ? 'contained' : 'outlined'}
                  onClick={() => handleTemaChange('auto')}
                  sx={{ flex: 1 }}
                >
                  Automático
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card
            elevation={0}
            sx={{
              borderRadius: '24px',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Segurança
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Gerencie sua segurança e privacidade
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2}>
                <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Alterar Senha
                </Button>
                <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Ativar Autenticação de Dois Fatores
                </Button>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Última alteração de senha: Nunca
                </Alert>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </ProtectedRoute>
  );
}
