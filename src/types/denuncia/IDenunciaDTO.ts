// src/types/denuncia/IDenunciaDTO.ts
// DTOs para comunicação com o backend

import { DenunciaStatus, DenunciaPrioridade } from './Denuncia.model';

export interface CreateDenunciaDTO {
  IdUsuario: number;
  Nome: string;
  Descricao: string;
  Status?: DenunciaStatus;
  Prioridade?: DenunciaPrioridade;
}

export interface UpdateDenunciaDTO {
  Nome?: string;
  Descricao?: string;
  Status?: DenunciaStatus;
  Prioridade?: DenunciaPrioridade;
}
