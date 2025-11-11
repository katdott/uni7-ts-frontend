// src/services/usuario.service.ts
import api from '../api/api';
import type { Usuario, CreateUsuarioDTO, UpdateUsuarioDTO } from '../types/usuario';

export class UsuarioService {
  private static baseUrl = '/usuarios';

  // Buscar todos os usuários
  static async getAll(): Promise<Usuario[]> {
    try {
      const response = await api.get<Usuario[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  }

  // Buscar usuário por ID
  static async getById(id: number): Promise<Usuario> {
    try {
      const response = await api.get<Usuario>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw error;
    }
  }

  // Criar novo usuário
  static async create(data: CreateUsuarioDTO): Promise<Usuario> {
    try {
      const response = await api.post<Usuario>(this.baseUrl, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  // Atualizar usuário
  static async update(id: number, data: UpdateUsuarioDTO): Promise<Usuario> {
    try {
      const response = await api.put<Usuario>(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${id}:`, error);
      throw error;
    }
  }

  // Desativar usuário
  static async deactivate(id: number): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao desativar usuário ${id}:`, error);
      throw error;
    }
  }
}
