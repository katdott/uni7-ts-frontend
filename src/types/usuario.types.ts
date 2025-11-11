// Types para Usuario - alinhados com o backend

export interface Usuario {
  IdUsuario: number;
  NomeUsuario: string;
  Ativa: boolean;
  Inclusao: string;
  Atualizacao: string;
}

export interface CreateUsuarioRequest {
  NomeUsuario: string;
  Senha: string;
}

export interface UpdateUsuarioRequest {
  NomeUsuario?: string;
  Senha?: string;
}

export interface UsuarioResponse {
  IdUsuario: number;
  NomeUsuario: string;
  Ativa: boolean;
  Inclusao: string;
  Atualizacao: string;
}
