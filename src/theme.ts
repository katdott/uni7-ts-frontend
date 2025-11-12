// src/theme.ts
'use client';

import { createTheme, PaletteMode } from '@mui/material/styles';

// Tema profissional para Sistema de Gestão Condominial
export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light' ? {
      // Tema Claro
      primary: {
        main: '#1565C0',
        light: '#42A5F5',
        dark: '#0D47A1',
        contrastText: '#fff',
      },
      secondary: {
        main: '#2E7D32',
        light: '#4CAF50',
        dark: '#1B5E20',
        contrastText: '#fff',
      },
      error: {
        main: '#D32F2F',
        light: '#EF5350',
        dark: '#C62828',
      },
      warning: {
        main: '#F57C00',
        light: '#FF9800',
        dark: '#E65100',
      },
      info: {
        main: '#0288D1',
        light: '#03A9F4',
        dark: '#01579B',
      },
      success: {
        main: '#388E3C',
        light: '#4CAF50',
        dark: '#2E7D32',
      },
      text: {
        primary: '#263238',
        secondary: '#546E7A',
        disabled: '#90A4AE',
      },
      background: {
        default: '#F5F7FA',
        paper: '#FFFFFF',
      },
      divider: '#E0E0E0',
    } : {
      // Tema Escuro
      primary: {
        main: '#42A5F5',
        light: '#64B5F6',
        dark: '#1565C0',
        contrastText: '#000',
      },
      secondary: {
        main: '#66BB6A',
        light: '#81C784',
        dark: '#388E3C',
        contrastText: '#000',
      },
      error: {
        main: '#EF5350',
        light: '#E57373',
        dark: '#D32F2F',
      },
      warning: {
        main: '#FFA726',
        light: '#FFB74D',
        dark: '#F57C00',
      },
      info: {
        main: '#29B6F6',
        light: '#4FC3F7',
        dark: '#0288D1',
      },
      success: {
        main: '#66BB6A',
        light: '#81C784',
        dark: '#388E3C',
      },
      text: {
        primary: '#ECEFF1',
        secondary: '#B0BEC5',
        disabled: '#78909C',
      },
      background: {
        default: '#121212',
        paper: '#1E1E1E',
      },
      divider: '#37474F',
    }),
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.9375rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.08)',
    '0px 6px 12px rgba(0,0,0,0.1)',
    '0px 8px 16px rgba(0,0,0,0.12)',
    '0px 12px 24px rgba(0,0,0,0.14)',
    '0px 16px 32px rgba(0,0,0,0.16)',
    '0px 20px 40px rgba(0,0,0,0.18)',
    '0px 24px 48px rgba(0,0,0,0.2)',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.08)',
    '0px 6px 12px rgba(0,0,0,0.1)',
    '0px 8px 16px rgba(0,0,0,0.12)',
    '0px 12px 24px rgba(0,0,0,0.14)',
    '0px 16px 32px rgba(0,0,0,0.16)',
    '0px 20px 40px rgba(0,0,0,0.18)',
    '0px 24px 48px rgba(0,0,0,0.2)',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.08)',
    '0px 6px 12px rgba(0,0,0,0.1)',
    '0px 8px 16px rgba(0,0,0,0.12)',
    '0px 12px 24px rgba(0,0,0,0.14)',
    '0px 16px 32px rgba(0,0,0,0.16)',
    '0px 20px 40px rgba(0,0,0,0.18)',
    '0px 24px 48px rgba(0,0,0,0.2)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '10px',
          padding: '10px 24px',
          fontWeight: 600,
          fontSize: '0.9375rem',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateY(-1px)',
          },
        },
        sizeLarge: {
          padding: '12px 32px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(0,0,0,0.06)',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            backgroundColor: '#FAFBFC',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#F5F7FA',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.8125rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          boxShadow: '0px 12px 48px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});
