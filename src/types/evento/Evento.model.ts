// src/types/evento/Evento.model.ts
export interface Evento {
  idEvento: number;
  titulo: string;
  descricao: string;
  dataEvento: string;
  local?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}
