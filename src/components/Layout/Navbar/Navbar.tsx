// src/components/Layout/Navbar/Navbar.tsx
'use client';

import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
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
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            Uni7 Sistema
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              href="/"
              color="inherit"
              sx={{
                backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Início
            </Button>
            {isAuthenticated && (
              <>
                <Button
                  component={Link}
                  href="/avisos"
                  color="inherit"
                  sx={{
                    backgroundColor: isActive('/avisos') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Avisos
                </Button>
                <Button
                  component={Link}
                  href="/denuncias"
                  color="inherit"
                  sx={{
                    backgroundColor: isActive('/denuncias') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Denúncias
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated && user ? (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>
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
                >
                  <MenuItem disabled>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {user.nomeUsuario}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                    Sair
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                href="/login"
                color="inherit"
                startIcon={<LoginIcon />}
                sx={{
                  backgroundColor: isActive('/login') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
