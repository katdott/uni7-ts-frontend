// src/theme.ts
'use client';

import { createTheme } from '@mui/material/styles';

// Paleta de cores mantida do projeto original
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E86DE', // Botões Primary
    },
    secondary: {
      main: '#00B894', // Botões Create
    },
    error: {
      main: '#e74c3c', // Botões Danger
    },
    text: {
      primary: '#333',
      secondary: '#636E72', // Text Highlight
    },
    background: {
      default: 'rgb(240, 247, 245)',
      paper: '#D9D9D9', // Post Background
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
          },
        },
      },
    },
  },
});
