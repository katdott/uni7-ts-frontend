// Service para operações de Usuario

import api from '../../api/api';
import type { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest } from '../../types';

// Criar novo usuário
export const createUsuario = async (data: CreateUsuarioRequest): Promise<Usuario> => {
  const response = await api.post('/usuarios', data);
  return response.data.usuario;
};

// Listar todos os usuários ativos
export const getAllUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get('/usuarios');
  return response.data;
};

// Buscar usuário por ID
export const getUsuarioById = async (id: number): Promise<Usuario> => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

// Atualizar usuário
export const updateUsuario = async (id: number, data: UpdateUsuarioRequest): Promise<Usuario> => {
  const response = await api.put(`/usuarios/${id}`, data);
  return response.data.usuario;
};

// Desativar usuário (soft delete)
export const deactivateUsuario = async (id: number): Promise<Usuario> => {
  const response = await api.patch(`/usuarios/${id}/desativar`);
  return response.data.usuario;
};
