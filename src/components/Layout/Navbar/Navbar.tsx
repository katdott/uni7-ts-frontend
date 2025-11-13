// src/components/Layout/Navbar/Navbar.tsx
'use client';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar,
  Divider,
  Badge,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useThemeMode } from '@/hooks/useThemeMode';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, getRoleIcon, getRoleColor } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isActive = (path: string) => pathname === path;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    router.push('/login');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: mode === 'light'
          ? 'rgba(255, 255, 255, 0.7)'
          : 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: mode === 'light'
          ? 'rgba(99, 102, 241, 0.1)'
          : 'rgba(129, 140, 248, 0.2)',
        boxShadow: '0px 4px 24px rgba(99, 102, 241, 0.08)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '72px !important' }}>
          {/* Logo com Gradiente e Animação */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              mr: 4,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                borderRadius: '16px',
                p: 1.2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 4px 16px rgba(99, 102, 241, 0.3)',
                animation: 'float 3s ease-in-out infinite',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  animation: 'rotate 10s linear infinite',
                },
              }}
            >
              <ApartmentIcon sx={{ color: 'white', fontSize: 30 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                  fontSize: '1.3rem',
                  letterSpacing: '-0.02em',
                }}
              >
                CondoManager
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  lineHeight: 1,
                  fontWeight: 500,
                }}
              >
                Sistema de Gestão
              </Typography>
            </Box>
          </Box>

          {/* Navigation Links com Glassmorphism */}
          <Box sx={{ display: 'flex', gap: 1.5, flexGrow: 1 }}>
            <Button
              component={Link}
              href="/"
              startIcon={<HomeIcon />}
              sx={{
                color: isActive('/') ? 'primary.main' : 'text.secondary',
                background: isActive('/') 
                  ? mode === 'light'
                    ? 'rgba(99, 102, 241, 0.1)'
                    : 'rgba(129, 140, 248, 0.15)'
                  : 'transparent',
                backdropFilter: isActive('/') ? 'blur(10px)' : 'none',
                borderRadius: '12px',
                px: 3,
                py: 1,
                fontWeight: isActive('/') ? 700 : 500,
                border: '1px solid',
                borderColor: isActive('/') 
                  ? 'rgba(99, 102, 241, 0.3)'
                  : 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: mode === 'light'
                    ? 'rgba(99, 102, 241, 0.08)'
                    : 'rgba(129, 140, 248, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transform: 'translateY(-2px)',
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                },
              }}
            >
              Dashboard
            </Button>
            {isAuthenticated && (
              <>
                <Button
                  component={Link}
                  href="/avisos"
                  startIcon={<CampaignIcon />}
                  sx={{
                    color: isActive('/avisos') ? 'primary.main' : 'text.secondary',
                    background: isActive('/avisos') 
                      ? mode === 'light'
                        ? 'rgba(99, 102, 241, 0.1)'
                        : 'rgba(129, 140, 248, 0.15)'
                      : 'transparent',
                    backdropFilter: isActive('/avisos') ? 'blur(10px)' : 'none',
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    fontWeight: isActive('/avisos') ? 700 : 500,
                    border: '1px solid',
                    borderColor: isActive('/avisos') 
                      ? 'rgba(99, 102, 241, 0.3)'
                      : 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: mode === 'light'
                        ? 'rgba(99, 102, 241, 0.08)'
                        : 'rgba(129, 140, 248, 0.1)',
                      backdropFilter: 'blur(10px)',
                      transform: 'translateY(-2px)',
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                    },
                  }}
                >
                  Avisos
                </Button>
                <Button
                  component={Link}
                  href="/denuncias"
                  startIcon={<ReportProblemIcon />}
                  sx={{
                    color: isActive('/denuncias') ? 'primary.main' : 'text.secondary',
                    background: isActive('/denuncias') 
                      ? mode === 'light'
                        ? 'rgba(99, 102, 241, 0.1)'
                        : 'rgba(129, 140, 248, 0.15)'
                      : 'transparent',
                    backdropFilter: isActive('/denuncias') ? 'blur(10px)' : 'none',
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    fontWeight: isActive('/denuncias') ? 700 : 500,
                    border: '1px solid',
                    borderColor: isActive('/denuncias') 
                      ? 'rgba(99, 102, 241, 0.3)'
                      : 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: mode === 'light'
                        ? 'rgba(99, 102, 241, 0.08)'
                        : 'rgba(129, 140, 248, 0.1)',
                      backdropFilter: 'blur(10px)',
                      transform: 'translateY(-2px)',
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                    },
                  }}
                >
                  Denúncias
                </Button>
              </>
            )}
          </Box>

          {/* Right Section com Glassmorphism */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated && user ? (
              <>
                {/* Notifications com Badge Gradiente */}
                <IconButton
                  sx={{
                    color: 'text.secondary',
                    background: mode === 'light'
                      ? 'rgba(99, 102, 241, 0.05)'
                      : 'rgba(129, 140, 248, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: mode === 'light'
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(129, 140, 248, 0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: mode === 'light'
                        ? 'rgba(99, 102, 241, 0.1)'
                        : 'rgba(129, 140, 248, 0.15)',
                      transform: 'translateY(-2px)',
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                    },
                  }}
                >
                  <Badge 
                    badgeContent={3} 
                    sx={{
                      '& .MuiBadge-badge': {
                        background: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
                        boxShadow: '0px 2px 8px rgba(236, 72, 153, 0.4)',
                      }
                    }}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                {/* Theme Toggle com Efeito Glassmorphic */}
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: 'text.secondary',
                    background: mode === 'light'
                      ? 'rgba(99, 102, 241, 0.05)'
                      : 'rgba(129, 140, 248, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: mode === 'light'
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(129, 140, 248, 0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: mode === 'light'
                        ? 'rgba(99, 102, 241, 0.1)'
                        : 'rgba(129, 140, 248, 0.15)',
                      transform: 'rotate(180deg)',
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                    },
                  }}
                  title={mode === 'light' ? 'Modo Escuro' : 'Modo Claro'}
                >
                  {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>

                {/* User Menu com Glassmorphism */}
                <Box
                  onClick={handleMenuOpen}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    cursor: 'pointer',
                    px: 2.5,
                    py: 1.2,
                    borderRadius: '16px',
                    background: mode === 'light'
                      ? 'rgba(99, 102, 241, 0.05)'
                      : 'rgba(129, 140, 248, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: mode === 'light'
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(129, 140, 248, 0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: mode === 'light'
                        ? 'rgba(99, 102, 241, 0.1)'
                        : 'rgba(129, 140, 248, 0.15)',
                      transform: 'translateY(-2px)',
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                      boxShadow: '0px 4px 16px rgba(99, 102, 241, 0.2)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: '0px 2px 12px rgba(99, 102, 241, 0.3)',
                    }}
                  >
                    {user.nomeUsuario.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        lineHeight: 1.2,
                        fontSize: '0.9rem',
                      }}
                    >
                      {user.nomeUsuario}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography
                        component="span"
                        sx={{
                          fontSize: '0.7rem',
                          color: getRoleColor(),
                          fontWeight: 600,
                        }}
                      >
                        {getRoleIcon()}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1,
                        }}
                      >
                        {user.role || 'Morador'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Menu Dropdown com Glassmorphism */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 220,
                      borderRadius: '20px',
                      background: mode === 'light'
                        ? 'rgba(255, 255, 255, 0.9)'
                        : 'rgba(30, 41, 59, 0.9)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid',
                      borderColor: mode === 'light'
                        ? 'rgba(99, 102, 241, 0.1)'
                        : 'rgba(129, 140, 248, 0.2)',
                      boxShadow: '0px 8px 32px rgba(99, 102, 241, 0.15)',
                      overflow: 'visible',
                    },
                  }}
                  slotProps={{
                    paper: {
                      elevation: 0,
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      px: 2.5, 
                      py: 2,
                      background: mode === 'light'
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)'
                        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                      borderRadius: '16px 16px 0 0',
                    }}
                  >
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {user.nomeUsuario}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.secondary',
                        fontWeight: 500,
                      }}
                    >
                      {user.role || 'Morador'}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderColor: 'rgba(99, 102, 241, 0.1)' }} />
                  <MenuItem
                    component={Link}
                    href="/perfil"
                    onClick={handleMenuClose}
                    sx={{
                      py: 1.5,
                      px: 2.5,
                      gap: 1.5,
                      mx: 1,
                      my: 0.5,
                      borderRadius: '12px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: mode === 'light'
                          ? 'rgba(99, 102, 241, 0.08)'
                          : 'rgba(129, 140, 248, 0.12)',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <PersonIcon fontSize="small" sx={{ color: 'primary.main' }} />
                    <Typography sx={{ fontWeight: 500 }}>Meu Perfil</Typography>
                  </MenuItem>
                  <Divider sx={{ borderColor: 'rgba(99, 102, 241, 0.1)', my: 0.5 }} />
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      color: 'error.main',
                      py: 1.5,
                      px: 2.5,
                      gap: 1.5,
                      mx: 1,
                      my: 0.5,
                      borderRadius: '12px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: mode === 'light'
                          ? 'rgba(239, 68, 68, 0.08)'
                          : 'rgba(248, 113, 113, 0.12)',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <LogoutIcon fontSize="small" />
                    <Typography sx={{ fontWeight: 500 }}>Sair do Sistema</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {/* Theme Toggle para usuários não autenticados */}
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: 'text.secondary',
                    background: mode === 'light'
                      ? 'rgba(99, 102, 241, 0.05)'
                      : 'rgba(129, 140, 248, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: mode === 'light'
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(129, 140, 248, 0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: mode === 'light'
                        ? 'rgba(99, 102, 241, 0.1)'
                        : 'rgba(129, 140, 248, 0.15)',
                      transform: 'rotate(180deg)',
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                    },
                  }}
                  title={mode === 'light' ? 'Modo Escuro' : 'Modo Claro'}
                >
                  {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
                
                <Button
                  component={Link}
                  href="/login"
                  variant="contained"
                  startIcon={<LoginIcon />}
                  sx={{
                    borderRadius: '16px',
                    px: 3.5,
                    py: 1.2,
                    background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                    boxShadow: '0px 4px 16px rgba(99, 102, 241, 0.3)',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 6px 20px rgba(99, 102, 241, 0.4)',
                    },
                  }}
                >
                  Entrar
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
