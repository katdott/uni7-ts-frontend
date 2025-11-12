// src/hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';

interface User {
  nomeUsuario: string;
  loggedIn: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
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
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
