// src/types/evento/IEventoDTO.ts
export interface CreateEventoDTO {
  titulo: string;
  descricao: string;
  dataEvento: string;
  local?: string;
}

export interface UpdateEventoDTO {
  titulo?: string;
  descricao?: string;
  dataEvento?: string;
  local?: string;
}
