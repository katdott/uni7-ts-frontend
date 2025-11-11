// Types para Aviso - alinhados com o backend

export interface Aviso {
  IdAviso: number;
  IdUsuario: number;
  Nome: string;
  Descricao: string;
  Ativa: boolean;
  Inclusao: string;
  Atualizacao: string;
  usuario?: {
    IdUsuario: number;
    NomeUsuario: string;
  };
}

export interface CreateAvisoRequest {
  IdUsuario: number;
  Nome: string;
  Descricao: string;
}

export interface UpdateAvisoRequest {
  Nome?: string;
  Descricao?: string;
}
