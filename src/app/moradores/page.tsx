'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import { UsuarioService } from '@/services/usuario.service';
import type { Usuario } from '@/types/usuario';

export default function MoradoresPage() {
  const [moradores, setMoradores] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});

  useEffect(() => {
    loadMoradores();
  }, []);

  const loadMoradores = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await UsuarioService.getAll();
      setMoradores(data);
    } catch (err) {
      setError('Erro ao carregar moradores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl({ ...anchorEl, [userId]: event.currentTarget });
  };

  const handleMenuClose = (userId: number) => {
    setAnchorEl({ ...anchorEl, [userId]: null });
  };

  const handleDelete = async (userId: number) => {
    if (confirm('Deseja realmente desativar este morador?')) {
      try {
        await UsuarioService.deactivate(userId);
        loadMoradores();
        handleMenuClose(userId);
      } catch (err) {
        alert('Erro ao desativar morador');
      }
    }
  };

  const filteredMoradores = moradores.filter((morador) =>
    morador.NomeUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = () => {
    return '#3B82F6';
  };

  const getRoleLabel = () => {
    return 'Morador';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
            Moradores
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {filteredMoradores.length} {filteredMoradores.length === 1 ? 'morador' : 'moradores'} cadastrados
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: '16px',
            px: 3,
            py: 1.5,
            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
            fontWeight: 700,
            '&:hover': {
              background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
            },
          }}
        >
          Novo Morador
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',
              background: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
            },
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>
          {error}
        </Alert>
      )}

      {/* Grid de Moradores */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {filteredMoradores.map((morador) => (
          <Card
            key={morador.IdUsuario}
            elevation={0}
            sx={{
              borderRadius: '24px',
              background: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(129, 140, 248, 0.15)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0px 12px 32px rgba(99, 102, 241, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    background: `linear-gradient(135deg, ${getRoleColor()} 0%, ${getRoleColor()}CC 100%)`,
                    fontWeight: 700,
                    fontSize: '1.5rem',
                  }}
                >
                  {morador.NomeUsuario.charAt(0).toUpperCase()}
                </Avatar>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, morador.IdUsuario)}
                  sx={{
                    background: (theme) =>
                      theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                  }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl[morador.IdUsuario]}
                  open={Boolean(anchorEl[morador.IdUsuario])}
                  onClose={() => handleMenuClose(morador.IdUsuario)}
                  PaperProps={{
                    sx: {
                      borderRadius: '12px',
                      minWidth: 160,
                    },
                  }}
                >
                  <MenuItem onClick={() => handleMenuClose(morador.IdUsuario)}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Editar
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDelete(morador.IdUsuario)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Desativar
                  </MenuItem>
                </Menu>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                {morador.NomeUsuario}
              </Typography>

              <Chip
                label={getRoleLabel()}
                size="small"
                sx={{
                  mb: 2,
                  background: `${getRoleColor()}20`,
                  color: getRoleColor(),
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                  {morador.IdUsuario}@condominio.com
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Chip
                  label={morador.Ativa ? 'Ativo' : 'Inativo'}
                  size="small"
                  sx={{
                    background: morador.Ativa ? '#10B98120' : '#EF444420',
                    color: morador.Ativa ? '#10B981' : '#EF4444',
                    fontWeight: 700,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredMoradores.length === 0 && !loading && (
        <Card
          elevation={0}
          sx={{
            borderRadius: '24px',
            p: 6,
            textAlign: 'center',
            background: (theme) =>
              theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <PeopleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Nenhum morador encontrado
          </Typography>
        </Card>
      )}
    </Box>
  );
}
