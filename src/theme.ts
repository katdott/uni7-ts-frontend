// src/theme.ts
'use client';

import { createTheme, PaletteMode } from '@mui/material/styles';

// Tema Ultra Moderno com Gradientes e Glassmorphism
export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light' ? {
      // Tema Claro - Gradientes Vibrantes
      primary: {
        main: '#6366F1', // Indigo moderno
        light: '#818CF8',
        dark: '#4F46E5',
        contrastText: '#fff',
      },
      secondary: {
        main: '#EC4899', // Pink vibrante
        light: '#F472B6',
        dark: '#DB2777',
        contrastText: '#fff',
      },
      error: {
        main: '#EF4444',
        light: '#F87171',
        dark: '#DC2626',
      },
      warning: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706',
      },
      info: {
        main: '#3B82F6',
        light: '#60A5FA',
        dark: '#2563EB',
      },
      success: {
        main: '#10B981',
        light: '#34D399',
        dark: '#059669',
      },
      text: {
        primary: '#1F2937',
        secondary: '#6B7280',
        disabled: '#9CA3AF',
      },
      background: {
        default: '#F9FAFB',
        paper: '#FFFFFF',
      },
      divider: 'rgba(0,0,0,0.08)',
    } : {
      // Tema Escuro - Neon & Cyberpunk
      primary: {
        main: '#818CF8',
        light: '#A5B4FC',
        dark: '#6366F1',
        contrastText: '#000',
      },
      secondary: {
        main: '#F472B6',
        light: '#F9A8D4',
        dark: '#EC4899',
        contrastText: '#000',
      },
      error: {
        main: '#F87171',
        light: '#FCA5A5',
        dark: '#EF4444',
      },
      warning: {
        main: '#FBBF24',
        light: '#FCD34D',
        dark: '#F59E0B',
      },
      info: {
        main: '#60A5FA',
        light: '#93C5FD',
        dark: '#3B82F6',
      },
      success: {
        main: '#34D399',
        light: '#6EE7B7',
        dark: '#10B981',
      },
      text: {
        primary: '#F9FAFB',
        secondary: '#D1D5DB',
        disabled: '#9CA3AF',
      },
      background: {
        default: '#0F172A', // Slate dark
        paper: '#1E293B',
      },
      divider: 'rgba(255,255,255,0.1)',
    }),
  },
  typography: {
    fontFamily: [
      'Plus Jakarta Sans',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      background: mode === 'light' 
        ? 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)'
        : 'linear-gradient(135deg, #818CF8 0%, #F472B6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.9375rem',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(99, 102, 241, 0.1)',
    '0px 4px 16px rgba(99, 102, 241, 0.12)',
    '0px 8px 24px rgba(99, 102, 241, 0.14)',
    '0px 12px 32px rgba(99, 102, 241, 0.16)',
    '0px 16px 40px rgba(99, 102, 241, 0.18)',
    '0px 20px 48px rgba(99, 102, 241, 0.2)',
    '0px 24px 56px rgba(99, 102, 241, 0.22)',
    '0px 28px 64px rgba(99, 102, 241, 0.24)',
    '0px 2px 8px rgba(99, 102, 241, 0.1)',
    '0px 4px 16px rgba(99, 102, 241, 0.12)',
    '0px 8px 24px rgba(99, 102, 241, 0.14)',
    '0px 12px 32px rgba(99, 102, 241, 0.16)',
    '0px 16px 40px rgba(99, 102, 241, 0.18)',
    '0px 20px 48px rgba(99, 102, 241, 0.2)',
    '0px 24px 56px rgba(99, 102, 241, 0.22)',
    '0px 28px 64px rgba(99, 102, 241, 0.24)',
    '0px 2px 8px rgba(99, 102, 241, 0.1)',
    '0px 4px 16px rgba(99, 102, 241, 0.12)',
    '0px 8px 24px rgba(99, 102, 241, 0.14)',
    '0px 12px 32px rgba(99, 102, 241, 0.16)',
    '0px 16px 40px rgba(99, 102, 241, 0.18)',
    '0px 20px 48px rgba(99, 102, 241, 0.2)',
    '0px 24px 56px rgba(99, 102, 241, 0.22)',
    '0px 28px 64px rgba(99, 102, 241, 0.24)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: mode === 'light'
            ? 'linear-gradient(135deg, #F9FAFB 0%, #EEF2FF 100%)'
            : 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
          backgroundAttachment: 'fixed',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: mode === 'light'
              ? 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
              : 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'pulse 8s ease-in-out infinite',
          },
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.5 },
          },
          '@keyframes fadeInUp': {
            '0%': { opacity: 0, transform: 'translateY(30px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          '@keyframes slideInLeft': {
            '0%': { opacity: 0, transform: 'translateX(-30px)' },
            '100%': { opacity: 1, transform: 'translateX(0)' },
          },
          '@keyframes slideInRight': {
            '0%': { opacity: 0, transform: 'translateX(30px)' },
            '100%': { opacity: 1, transform: 'translateX(0)' },
          },
          '@keyframes scaleIn': {
            '0%': { opacity: 0, transform: 'scale(0.95)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '-1000px 0' },
            '100%': { backgroundPosition: '1000px 0' },
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          '@keyframes rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          padding: '12px 28px',
          fontWeight: 600,
          fontSize: '0.9375rem',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 12px 32px rgba(99, 102, 241, 0.3)',
            '&::before': {
              opacity: 1,
            },
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
        },
        containedError: {
          background: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)',
        },
        sizeLarge: {
          padding: '14px 36px',
          fontSize: '1.0625rem',
          borderRadius: '14px',
        },
        sizeSmall: {
          padding: '8px 20px',
          fontSize: '0.875rem',
          borderRadius: '10px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: mode === 'light'
            ? '0px 8px 32px rgba(99, 102, 241, 0.12)'
            : '0px 8px 32px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: mode === 'light'
            ? '1px solid rgba(99, 102, 241, 0.1)'
            : '1px solid rgba(129, 140, 248, 0.2)',
          background: mode === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #6366F1 0%, #EC4899 50%, #F59E0B 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-8px) scale(1.01)',
            boxShadow: mode === 'light'
              ? '0px 20px 60px rgba(99, 102, 241, 0.25)'
              : '0px 20px 60px rgba(129, 140, 248, 0.3)',
            '&::before': {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '28px',
          '&:last-child': {
            paddingBottom: '28px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '14px',
            backgroundColor: mode === 'light'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            border: mode === 'light'
              ? '1px solid rgba(99, 102, 241, 0.1)'
              : '1px solid rgba(129, 140, 248, 0.2)',
            '&:hover': {
              backgroundColor: mode === 'light'
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(30, 41, 59, 0.7)',
              boxShadow: '0px 4px 16px rgba(99, 102, 241, 0.1)',
            },
            '&.Mui-focused': {
              backgroundColor: mode === 'light'
                ? '#FFFFFF'
                : 'rgba(30, 41, 59, 0.8)',
              boxShadow: '0px 8px 24px rgba(99, 102, 241, 0.2)',
              borderColor: '#6366F1',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          fontWeight: 600,
          fontSize: '0.8125rem',
          padding: '4px',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        colorPrimary: {
          background: mode === 'light'
            ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
            : 'rgba(129, 140, 248, 0.2)',
          border: mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.4)' : 'none',
        },
        colorSecondary: {
          background: mode === 'light'
            ? 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)'
            : 'rgba(244, 114, 182, 0.2)',
          border: mode === 'dark' ? '1px solid rgba(244, 114, 182, 0.4)' : 'none',
        },
        colorError: {
          background: mode === 'light'
            ? 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)'
            : 'rgba(248, 113, 113, 0.2)',
          border: mode === 'dark' ? '1px solid rgba(248, 113, 113, 0.4)' : 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          background: mode === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: mode === 'light'
            ? '1px solid rgba(99, 102, 241, 0.1)'
            : '1px solid rgba(129, 140, 248, 0.2)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '24px',
          boxShadow: '0px 24px 80px rgba(99, 102, 241, 0.3)',
          background: mode === 'light'
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(20px)',
          border: mode === 'light'
            ? '1px solid rgba(99, 102, 241, 0.1)'
            : '1px solid rgba(129, 140, 248, 0.2)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: '20px',
        },
        elevation1: {
          boxShadow: '0px 4px 16px rgba(99, 102, 241, 0.08)',
        },
      },
    },
  },
});
