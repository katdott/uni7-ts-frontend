// src/app/layout.tsx
'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { getTheme } from '../theme';
import { Sidebar } from '../components/Layout/Sidebar';
import { ThemeProvider, useThemeMode } from '../hooks/useThemeMode';
import { AuthProvider } from '../hooks/useAuth';
import { ToastProvider } from '../contexts/ToastContext';
import { Box } from '@mui/material';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            width: '100%',
            minHeight: '100vh',
          }}
        >
          {children}
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <AuthProvider>
              <ToastProvider>
                <LayoutContent>{children}</LayoutContent>
              </ToastProvider>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
