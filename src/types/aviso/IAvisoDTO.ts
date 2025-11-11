// src/types/aviso/IAvisoDTO.ts
// DTOs para comunicação com o backend

export interface CreateAvisoDTO {
  IdUsuario: number;
  Nome: string;
  Descricao: string;
}

export interface UpdateAvisoDTO {
  Nome?: string;
  Descricao?: string;
}
