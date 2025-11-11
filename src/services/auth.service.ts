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
  mensagem: string;
}

class AuthServiceClass {
  async login(data: LoginDTO): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/usuarios/login', data);
    return response.data;
  }
}

export const AuthService = new AuthServiceClass();
