// src/services/dashboard.service.ts
import api from '../api/api';

export interface DashboardStats {
  avisosAtivos: number;
  denunciasAbertas: number;
  usuariosAtivos: number;
  taxaResolucao: number;
  denunciasPorStatus: {
    Aberta: number;
    'Em análise': number;
    Resolvida: number;
    Rejeitada: number;
  };
  denunciasPorPrioridade: {
    Baixa: number;
    Média: number;
    Alta: number;
    Urgente: number;
  };
}

export const DashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },
};
