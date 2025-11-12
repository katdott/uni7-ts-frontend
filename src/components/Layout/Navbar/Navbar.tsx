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
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '70px !important' }}>
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              mr: 4,
            }}
          >
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '12px',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ApartmentIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  lineHeight: 1.2,
                  fontSize: '1.25rem',
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
                }}
              >
                Sistema de Gestão
              </Typography>
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
            <Button
              component={Link}
              href="/"
              startIcon={<HomeIcon />}
              sx={{
                color: isActive('/') ? 'primary.main' : 'text.secondary',
                backgroundColor: isActive('/') ? 'primary.light' + '15' : 'transparent',
                borderRadius: '10px',
                px: 2.5,
                '&:hover': {
                  backgroundColor: 'primary.light' + '10',
                  color: 'primary.main',
                },
                fontWeight: isActive('/') ? 600 : 500,
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
                    backgroundColor: isActive('/avisos') ? 'primary.light' + '15' : 'transparent',
                    borderRadius: '10px',
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: 'primary.light' + '10',
                      color: 'primary.main',
                    },
                    fontWeight: isActive('/avisos') ? 600 : 500,
                  }}
                >
                  Avisos
                </Button>
                <Button
                  component={Link}
                  href="/denuncias"
                  startIcon={<ReportProblemIcon />}
                  sx={{
                    color: isActive('/denuncias') ? 'error.main' : 'text.secondary',
                    backgroundColor: isActive('/denuncias') ? 'error.light' + '15' : 'transparent',
                    borderRadius: '10px',
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: 'error.light' + '10',
                      color: 'error.main',
                    },
                    fontWeight: isActive('/denuncias') ? 600 : 500,
                  }}
                >
                  Denúncias
                </Button>
              </>
            )}
          </Box>

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated && user ? (
              <>
                {/* Notifications */}
                <IconButton
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                {/* Theme Toggle Button */}
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                  title={mode === 'light' ? 'Modo Escuro' : 'Modo Claro'}
                >
                  {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>

                {/* User Menu */}
                <Box
                  onClick={handleMenuOpen}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    cursor: 'pointer',
                    px: 2,
                    py: 1,
                    borderRadius: '12px',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: 'primary.main',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    {user.nomeUsuario.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        lineHeight: 1.2,
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
                      minWidth: 200,
                      borderRadius: '12px',
                      boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {user.nomeUsuario}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.role || 'Morador'}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem
                    component={Link}
                    href="/perfil"
                    onClick={handleMenuClose}
                    sx={{
                      py: 1.5,
                      px: 2,
                      gap: 1.5,
                    }}
                  >
                    <PersonIcon fontSize="small" />
                    Meu Perfil
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      color: 'error.main',
                      py: 1.5,
                      px: 2,
                      gap: 1.5,
                    }}
                  >
                    <LogoutIcon fontSize="small" />
                    Sair do Sistema
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {/* Theme Toggle Button for non-authenticated users */}
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'action.hover',
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
                    borderRadius: '10px',
                    px: 3,
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
