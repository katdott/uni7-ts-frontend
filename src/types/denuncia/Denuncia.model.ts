// src/types/denuncia/Denuncia.model.ts
// Model da entidade Denuncia

export type DenunciaStatus = 'Aberta' | 'Em análise' | 'Resolvida' | 'Rejeitada';
export type DenunciaPrioridade = 'Baixa' | 'Média' | 'Alta' | 'Urgente';

export interface Denuncia {
  IdDenuncia: number;
  IdUsuario: number;
  IdCategoria?: number | null;
  Nome: string;
  Descricao: string;
  Status: DenunciaStatus;
  Prioridade: DenunciaPrioridade;
  Ativa: boolean;
  Inclusao: string;
  Atualizacao: string;
  DataResolucao?: string | null;
  usuario?: {
    IdUsuario: number;
    NomeUsuario: string;
  };
  categoria?: {
    IdCategoria: number;
    Nome: string;
    Cor: string | null;
    Icone: string | null;
  };
}
