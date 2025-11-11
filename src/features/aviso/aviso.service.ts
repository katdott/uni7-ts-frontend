// Service para operações de Aviso

import api from '../../api/api';
import type { Aviso, CreateAvisoRequest, UpdateAvisoRequest } from '../../types';

// Criar novo aviso
export const createAviso = async (data: CreateAvisoRequest): Promise<Aviso> => {
  const response = await api.post('/avisos', data);
  return response.data.aviso;
};

// Listar todos os avisos ativos
export const getAllAvisos = async (): Promise<Aviso[]> => {
  const response = await api.get('/avisos');
  return response.data;
};

// Buscar aviso por ID
export const getAvisoById = async (id: number): Promise<Aviso> => {
  const response = await api.get(`/avisos/${id}`);
  return response.data;
};

// Atualizar aviso
export const updateAviso = async (id: number, data: UpdateAvisoRequest): Promise<Aviso> => {
  const response = await api.put(`/avisos/${id}`, data);
  return response.data.aviso;
};

// Desativar aviso (soft delete)
export const deactivateAviso = async (id: number): Promise<Aviso> => {
  const response = await api.patch(`/avisos/${id}/desativar`);
  return response.data.aviso;
};
