// src/services/evento.service.ts
import api from '../api/api';
import type { Evento, CreateEventoDTO, UpdateEventoDTO } from '../types/evento';

export class EventoService {
  private static baseUrl = '/eventos';

  // Buscar todos os eventos
  static async getAll(): Promise<Evento[]> {
    try {
      const response = await api.get<Evento[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      // Retornar dados mock se o endpoint não existir
      return this.getMockData();
    }
  }

  // Buscar evento por ID
  static async getById(id: number): Promise<Evento> {
    try {
      const response = await api.get<Evento>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar evento ${id}:`, error);
      throw error;
    }
  }

  // Criar novo evento
  static async create(data: CreateEventoDTO): Promise<Evento> {
    try {
      const response = await api.post<Evento>(this.baseUrl, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  }

  // Atualizar evento
  static async update(id: number, data: UpdateEventoDTO): Promise<Evento> {
    try {
      const response = await api.put<Evento>(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar evento ${id}:`, error);
      throw error;
    }
  }

  // Desativar evento
  static async deactivate(id: number): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao desativar evento ${id}:`, error);
      throw error;
    }
  }

  // Dados mock temporários
  private static getMockData(): Evento[] {
    return [
      {
        idEvento: 1,
        titulo: 'Assembleia Geral Ordinária',
        descricao: 'Discussão sobre melhorias no condomínio e aprovação de orçamento anual',
        dataEvento: '2025-12-15T19:00:00',
        local: 'Salão de Festas',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        idEvento: 2,
        titulo: 'Festa de Fim de Ano',
        descricao: 'Confraternização com todos os moradores do condomínio',
        dataEvento: '2025-12-22T20:00:00',
        local: 'Área de Lazer',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        idEvento: 3,
        titulo: 'Manutenção Preventiva',
        descricao: 'Vistoria geral de instalações elétricas e hidráulicas',
        dataEvento: '2025-11-20T08:00:00',
        local: 'Todas as Áreas',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        idEvento: 4,
        titulo: 'Reunião do Conselho',
        descricao: 'Reunião mensal do conselho administrativo',
        dataEvento: '2025-11-18T19:30:00',
        local: 'Sala de Reuniões',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}
