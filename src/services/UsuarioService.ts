// src/services/UsuarioService.ts

import api from '../api/api';

// Tipos para Usuário
export interface CreateUsuarioData {
  NomeUsuario: string;
  Senha: string;
}

export interface Usuario {
  IdUsuario: number;
  NomeUsuario: string;
  Ativa: boolean;
}

// 1. Cria um novo usuário (POST /usuarios)
export const createUsuario = async (data: CreateUsuarioData): Promise<Usuario> => {
  const response = await api.post('/usuarios', data);
  // Retorna o objeto 'usuario' aninhado
  return response.data.usuario;
};

// 2. Lista todos os usuários ativos (GET /usuarios)
export const listUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get('/usuarios');
  return response.data; // Retorna um array de usuários
};

// 3. LÓGICA DE UPSERT: Encontra ou Cria o usuário e retorna seu ID
export const findOrCreateUser = async (userCredentials: CreateUsuarioData): Promise<number> => {
  const { NomeUsuario, Senha } = userCredentials;

  // PASSO A: BUSCAR USUÁRIOS EXISTENTES
  const allUsers = await listUsuarios();

  // PASSO B: PROCURAR LOCALMENTE pelo NomeUsuario
  const existingUser = allUsers.find(user => user.NomeUsuario === NomeUsuario);

  if (existingUser) {
    // Se ENCONTROU: Retorna o ID
    return existingUser.IdUsuario;
  } else {
    // Se NÃO ENCONTROU: Cria um novo usuário
    const newUser = await createUsuario({ NomeUsuario, Senha });

    // Retorna o ID do recém-criado
    return newUser.IdUsuario;
  }
};