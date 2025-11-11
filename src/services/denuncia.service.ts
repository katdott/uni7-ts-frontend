// src/services/denuncia.service.ts
import api from '../api/api';
import type { Denuncia, CreateDenunciaDTO, UpdateDenunciaDTO } from '../types/denuncia';

export class DenunciaService {
  private static baseUrl = '/denuncia';

  // Buscar todas as denúncias
  static async getAll(): Promise<Denuncia[]> {
    try {
      const response = await api.get<Denuncia[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar denúncias:', error);
      throw error;
    }
  }

  // Buscar denúncia por ID
  static async getById(id: number): Promise<Denuncia> {
    try {
      const response = await api.get<Denuncia>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar denúncia ${id}:`, error);
      throw error;
    }
  }

  // Criar nova denúncia
  static async create(data: CreateDenunciaDTO): Promise<Denuncia> {
    try {
      const response = await api.post<Denuncia>(this.baseUrl, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar denúncia:', error);
      throw error;
    }
  }

  // Atualizar denúncia
  static async update(id: number, data: UpdateDenunciaDTO): Promise<Denuncia> {
    try {
      const response = await api.put<Denuncia>(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar denúncia ${id}:`, error);
      throw error;
    }
  }

  // Desativar denúncia
  static async deactivate(id: number): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao desativar denúncia ${id}:`, error);
      throw error;
    }
  }
}
