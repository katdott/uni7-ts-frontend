// Service para operações de Denuncia

import api from '../../api/api';
import type { Denuncia, CreateDenunciaRequest, UpdateDenunciaRequest } from '../../types';

// Criar nova denúncia
export const createDenuncia = async (data: CreateDenunciaRequest): Promise<Denuncia> => {
  const response = await api.post('/denuncias', data);
  return response.data.denuncia;
};

// Listar todas as denúncias ativas
export const getAllDenuncias = async (): Promise<Denuncia[]> => {
  const response = await api.get('/denuncias');
  return response.data;
};

// Buscar denúncia por ID
export const getDenunciaById = async (id: number): Promise<Denuncia> => {
  const response = await api.get(`/denuncias/${id}`);
  return response.data;
};

// Atualizar denúncia
export const updateDenuncia = async (id: number, data: UpdateDenunciaRequest): Promise<Denuncia> => {
  const response = await api.put(`/denuncias/${id}`, data);
  return response.data.denuncia;
};

// Desativar denúncia (soft delete)
export const deactivateDenuncia = async (id: number): Promise<Denuncia> => {
  const response = await api.patch(`/denuncias/${id}/desativar`);
  return response.data.denuncia;
};
