// src/types/denuncia/IDenunciaDTO.ts
// DTOs para comunicação com o backend

export interface CreateDenunciaDTO {
  IdUsuario: number;
  Nome: string;
  Descricao: string;
}

export interface UpdateDenunciaDTO {
  Nome?: string;
  Descricao?: string;
}
