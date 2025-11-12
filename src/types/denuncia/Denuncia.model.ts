// src/types/denuncia/Denuncia.model.ts
// Model da entidade Denuncia

export interface Denuncia {
  IdDenuncia: number;
  IdUsuario: number;
  Nome: string;
  Descricao: string;
  Ativa: boolean;
  Inclusao: string;
  Atualizacao: string;
  usuario: {
    IdUsuario: number;
    NomeUsuario: string;
  };
}
