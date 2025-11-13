// src/types/aviso/IAvisoDTO.ts
// DTOs para comunicação com o backend

export interface CreateAvisoDTO {
  Nome: string;
  Descricao: string;
  DataEvento?: string;
}

export interface UpdateAvisoDTO {
  Nome?: string;
  Descricao?: string;
  DataEvento?: string;
}
