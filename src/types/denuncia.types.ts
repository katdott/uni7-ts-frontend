// Types para Denuncia - alinhados com o backend

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

export interface CreateDenunciaRequest {
  IdUsuario: number;
  Nome: string;
  Descricao: string;
}

export interface UpdateDenunciaRequest {
  Nome?: string;
  Descricao?: string;
}
