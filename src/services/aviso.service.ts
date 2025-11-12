// src/services/aviso.service.ts
import api from '../api/api';
import type { Aviso, CreateAvisoDTO, UpdateAvisoDTO } from '../types/aviso';

export class AvisoService {
  private static baseUrl = '/avisos';

  // Buscar todos os avisos
  static async getAll(): Promise<Aviso[]> {
    try {
      const response = await api.get<Aviso[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar avisos:', error);
      throw error;
    }
  }

  // Buscar aviso por ID
  static async getById(id: number): Promise<Aviso> {
    try {
      const response = await api.get<Aviso>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar aviso ${id}:`, error);
      throw error;
    }
  }

  // Criar novo aviso
  static async create(data: CreateAvisoDTO): Promise<Aviso> {
    try {
      const response = await api.post<Aviso>(this.baseUrl, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar aviso:', error);
      throw error;
    }
  }

  // Atualizar aviso
  static async update(id: number, data: UpdateAvisoDTO): Promise<Aviso> {
    try {
      const response = await api.put<Aviso>(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar aviso ${id}:`, error);
      throw error;
    }
  }

  // Desativar aviso
  static async deactivate(id: number): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao desativar aviso ${id}:`, error);
      throw error;
    }
  }
}
