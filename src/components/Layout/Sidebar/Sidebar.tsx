'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useAuth } from '@/hooks/useAuth';
import { useThemeMode } from '@/hooks/useThemeMode';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 80;

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, getRoleColor } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const [expanded, setExpanded] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Persistir estado do sidebar
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarExpanded');
    if (savedState !== null) {
      setExpanded(savedState === 'true');
    }
  }, []);

  const handleToggleSidebar = () => {
    const newState = !expanded;
    setExpanded(newState);
    localStorage.setItem('sidebarExpanded', String(newState));
  };

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    router.push('/login');
  };

  const menuItems = [
    { icon: <HomeIcon />, label: 'Dashboard', path: '/', badge: null },
    { icon: <CampaignIcon />, label: 'Avisos', path: '/avisos', badge: 3 },
    { icon: <ReportProblemIcon />, label: 'Denúncias', path: '/denuncias', badge: 5 },
    { icon: <CalendarMonthIcon />, label: 'Eventos', path: '/eventos', badge: null },
    { icon: <PeopleIcon />, label: 'Moradores', path: '/moradores', badge: null },
  ];

  if (!isAuthenticated) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
      <Drawer
        variant="permanent"
        sx={{
          width: expanded ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: expanded ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
            boxSizing: 'border-box',
            background: (theme) => theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: '1px solid',
            borderColor: (theme) => theme.palette.mode === 'light'
              ? 'rgba(99, 102, 241, 0.1)'
              : 'rgba(129, 140, 248, 0.15)',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflowX: 'hidden',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(99, 102, 241, 0.2)',
              borderRadius: '10px',
              '&:hover': {
                background: 'rgba(99, 102, 241, 0.3)',
              },
            },
          },
        }}
      >
      {/* Logo e Toggle */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'space-between' : 'center',
          gap: 2,
        }}
      >
        {expanded && (
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              minWidth: 0,
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
              }}
            >
              <ApartmentIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.02em',
              }}
            >
              CondoManager
            </Typography>
          </Box>
        )}
        {!expanded && (
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
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
              }}
            >
              <ApartmentIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
          </Box>
        )}
        <IconButton
          onClick={handleToggleSidebar}
          sx={{
            background: (theme) => theme.palette.mode === 'light'
              ? 'rgba(99, 102, 241, 0.05)'
              : 'rgba(129, 140, 248, 0.08)',
            transition: 'all 0.3s ease',
            ...(expanded ? {} : { position: 'absolute', top: 12, right: 12 }),
            '&:hover': {
              background: (theme) => theme.palette.mode === 'light'
                ? 'rgba(99, 102, 241, 0.12)'
                : 'rgba(129, 140, 248, 0.15)',
            },
          }}
        >
          {expanded ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(99, 102, 241, 0.1)' }} />

      {/* User Profile */}
      {user && (
        <Box
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            background: (theme) => theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
            mx: 2,
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: (theme) => theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
              transform: 'translateY(-2px)',
            },
          }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              fontWeight: 700,
              fontSize: '1.2rem',
              boxShadow: '0px 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            {user.nomeUsuario.charAt(0).toUpperCase()}
          </Avatar>
          {expanded && (
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user.nomeUsuario}
              </Typography>
              <Chip
                label={user.role || 'Morador'}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${getRoleColor()} 0%, ${getRoleColor()}CC 100%)`,
                  color: 'white',
                }}
              />
            </Box>
          )}
        </Box>
      )}

      {/* Menu Items */}
      <List sx={{ px: 2, py: 3, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <Tooltip title={!expanded ? item.label : ''} placement="right">
              <ListItemButton
                component={Link}
                href={item.path}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: '16px',
                  py: 1.5,
                  px: expanded ? 2.5 : 2,
                  minHeight: 56,
                  justifyContent: expanded ? 'flex-start' : 'center',
                  background: isActive(item.path)
                    ? (theme) => theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)'
                    : 'transparent',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: '4px',
                    background: isActive(item.path)
                      ? 'linear-gradient(180deg, #6366F1 0%, #EC4899 100%)'
                      : 'transparent',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover': {
                    background: (theme) => theme.palette.mode === 'light'
                      ? 'rgba(99, 102, 241, 0.08)'
                      : 'rgba(129, 140, 248, 0.12)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: expanded ? 40 : 0,
                    color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                    justifyContent: 'center',
                  }}
                >
                  {item.badge ? (
                    <Badge
                      badgeContent={item.badge}
                      sx={{
                        '& .MuiBadge-badge': {
                          background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                          boxShadow: '0px 2px 8px rgba(239, 68, 68, 0.4)',
                          fontWeight: 700,
                        },
                      }}
                    >
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                {expanded && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive(item.path) ? 700 : 500,
                      fontSize: '0.95rem',
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(99, 102, 241, 0.1)' }} />

      {/* Bottom Actions */}
      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <Tooltip title={!expanded ? 'Notificações' : ''} placement="right">
            <ListItemButton
              component={Link}
              href="/notificacoes"
              selected={isActive('/notificacoes')}
              sx={{
                borderRadius: '16px',
                py: 1.5,
                px: expanded ? 2.5 : 2,
                justifyContent: expanded ? 'flex-start' : 'center',
                background: isActive('/notificacoes')
                  ? (theme) => theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)'
                  : 'transparent',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '4px',
                  background: isActive('/notificacoes')
                    ? 'linear-gradient(180deg, #6366F1 0%, #EC4899 100%)'
                    : 'transparent',
                  transition: 'all 0.3s ease',
                },
                '&:hover': {
                  background: (theme) => theme.palette.mode === 'light'
                    ? 'rgba(99, 102, 241, 0.08)'
                    : 'rgba(129, 140, 248, 0.12)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: expanded ? 40 : 0, color: isActive('/notificacoes') ? 'primary.main' : 'text.secondary', justifyContent: 'center' }}>
                <Badge
                  badgeContent={8}
                  sx={{
                    '& .MuiBadge-badge': {
                      background: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
                      boxShadow: '0px 2px 8px rgba(236, 72, 153, 0.4)',
                      fontWeight: 700,
                    },
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </ListItemIcon>
              {expanded && <ListItemText primary="Notificações" primaryTypographyProps={{ fontWeight: isActive('/notificacoes') ? 700 : 500, fontSize: '0.95rem' }} />}
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <Tooltip title={!expanded ? (mode === 'light' ? 'Modo Escuro' : 'Modo Claro') : ''} placement="right">
            <ListItemButton
              onClick={toggleTheme}
              sx={{
                borderRadius: '16px',
                py: 1.5,
                px: expanded ? 2.5 : 2,
                justifyContent: expanded ? 'flex-start' : 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: (theme) => theme.palette.mode === 'light'
                    ? 'rgba(99, 102, 241, 0.08)'
                    : 'rgba(129, 140, 248, 0.12)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: expanded ? 40 : 0, color: 'text.secondary', justifyContent: 'center' }}>
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </ListItemIcon>
              {expanded && <ListItemText primary={mode === 'light' ? 'Modo Escuro' : 'Modo Claro'} primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }} />}
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding>
          <Tooltip title={!expanded ? 'Configurações' : ''} placement="right">
            <ListItemButton
              component={Link}
              href="/configuracoes"
              selected={isActive('/configuracoes')}
              sx={{
                borderRadius: '16px',
                py: 1.5,
                px: expanded ? 2.5 : 2,
                justifyContent: expanded ? 'flex-start' : 'center',
                background: isActive('/configuracoes')
                  ? (theme) => theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)'
                  : 'transparent',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '4px',
                  background: isActive('/configuracoes')
                    ? 'linear-gradient(180deg, #6366F1 0%, #EC4899 100%)'
                    : 'transparent',
                  transition: 'all 0.3s ease',
                },
                '&:hover': {
                  background: (theme) => theme.palette.mode === 'light'
                    ? 'rgba(99, 102, 241, 0.08)'
                    : 'rgba(129, 140, 248, 0.12)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: expanded ? 40 : 0, color: isActive('/configuracoes') ? 'primary.main' : 'text.secondary', justifyContent: 'center' }}>
                <SettingsIcon />
              </ListItemIcon>
              {expanded && <ListItemText primary="Configurações" primaryTypographyProps={{ fontWeight: isActive('/configuracoes') ? 700 : 500, fontSize: '0.95rem' }} />}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{
          sx: {
            borderRadius: '20px',
            minWidth: 200,
            background: (theme) => theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.95)'
              : 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0px 8px 32px rgba(99, 102, 241, 0.2)',
          },
        }}
      >
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main', borderRadius: '12px', mx: 1, gap: 1.5 }}>
          <LogoutIcon fontSize="small" />
          Sair do Sistema
        </MenuItem>
      </Menu>
    </Drawer>
    </>
  );
}
