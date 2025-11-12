// src/types/usuario/IUsuarioDTO.ts
// DTOs para comunicação com o backend

export interface CreateUsuarioDTO {
  NomeUsuario: string;
  Senha: string;
}

export interface UpdateUsuarioDTO {
  NomeUsuario?: string;
  Senha?: string;
}
