// src/services/auth.service.ts
import api from '../api/api';

export interface LoginDTO {
  NomeUsuario: string;
  Senha: string;
}

export interface LoginResponse {
  IdUsuario: number;
  NomeUsuario: string;
  Email?: string;
  token?: string;
  mensagem: string;
}

class AuthServiceClass {
  async login(data: LoginDTO): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/usuarios/login', data);
    
    // Salvar token no localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export const AuthService = new AuthServiceClass();
