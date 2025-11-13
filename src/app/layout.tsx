// src/app/layout.tsx
'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { getTheme } from '../theme';
import { Navbar } from '../components/Layout/Navbar/Navbar';
import { ThemeProvider, useThemeMode } from '../hooks/useThemeMode';
import { AuthProvider } from '../hooks/useAuth';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main>{children}</main>
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
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <AuthProvider>
              <LayoutContent>{children}</LayoutContent>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
