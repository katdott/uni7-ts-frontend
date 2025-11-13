// src/hooks/useAuth.ts
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export type UserRole = 'Morador' | 'Porteiro' | 'Administrador' | 'Síndico';

interface User {
  nomeUsuario: string;
  role?: UserRole;
  email?: string;
  loggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  hasRole: (...roles: UserRole[]) => boolean;
  canCreateAviso: () => boolean;
  canModifyDenuncia: () => boolean;
  canManageUsers: () => boolean;
  getRoleIcon: () => string;
  getRoleColor: () => string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  hasRole: () => false,
  canCreateAviso: () => false,
  canModifyDenuncia: () => false,
  canManageUsers: () => false,
  getRoleIcon: () => '👤',
  getRoleColor: () => '#CCCCCC',
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
        localStorage.removeItem('usuario');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('usuario', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    setUser(null);
  };

  const hasRole = (...roles: UserRole[]): boolean => {
    if (!user || !user.role) return false;
    return roles.includes(user.role);
  };

  const canCreateAviso = (): boolean => {
    return hasRole('Porteiro', 'Administrador', 'Síndico');
  };

  const canModifyDenuncia = (): boolean => {
    return hasRole('Porteiro', 'Administrador', 'Síndico');
  };

  const canManageUsers = (): boolean => {
    return hasRole('Administrador', 'Síndico');
  };

  const getRoleIcon = (): string => {
    switch (user?.role) {
      case 'Síndico': return '👑';
      case 'Administrador': return '🔧';
      case 'Porteiro': return '🚪';
      case 'Morador': return '🏠';
      default: return '👤';
    }
  };

  const getRoleColor = (): string => {
    switch (user?.role) {
      case 'Síndico': return '#FFD700';
      case 'Administrador': return '#FF6B6B';
      case 'Porteiro': return '#4ECDC4';
      case 'Morador': return '#95E1D3';
      default: return '#CCCCCC';
    }
  };

  const contextValue = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    hasRole,
    canCreateAviso,
    canModifyDenuncia,
    canManageUsers,
    getRoleIcon,
    getRoleColor,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
