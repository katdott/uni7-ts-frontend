// src/types/denuncia/Denuncia.model.ts
// Model da entidade Denuncia

export type DenunciaStatus = 'Aberta' | 'Em análise' | 'Resolvida' | 'Rejeitada';
export type DenunciaPrioridade = 'Baixa' | 'Média' | 'Alta' | 'Urgente';

export interface Denuncia {
  IdDenuncia: number;
  IdUsuario: number;
  Nome: string;
  Descricao: string;
  Status: DenunciaStatus;
  Prioridade: DenunciaPrioridade;
  Ativa: boolean;
  Inclusao: string;
  Atualizacao: string;
  usuario?: {
    IdUsuario: number;
    NomeUsuario: string;
  };
}
