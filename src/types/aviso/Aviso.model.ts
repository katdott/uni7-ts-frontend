// src/types/aviso/Aviso.model.ts
// Model da entidade Aviso

export interface Aviso {
  IdAviso: number;
  IdUsuario: number;
  Nome: string;
  Descricao: string;
  Ativa: boolean;
  Inclusao: string;
  Atualizacao: string;
  DataEvento?: string | null;
  usuario?: {
    IdUsuario: number;
    NomeUsuario: string;
  };
}
