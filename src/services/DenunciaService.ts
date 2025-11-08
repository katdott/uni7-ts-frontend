// src/services/DenunciaService.ts

import api from '../api/api';

// Interface para os dados que o frontend envia
export interface IRequestDenuncia {
    IdUsuario: number;
    Nome: string;
    Descricao: string;
}

// Interface para o objeto de Denúncia que o backend retorna
export interface Denuncia {
    IdDenuncia: number;
    IdUsuario: number;
    Nome: string;
    Descricao: string;
    Ativa: boolean;
    Inclusao: string;
    usuario: {
        IdUsuario: number;
        NomeUsuario: string;
    };
}

// 1. Cria uma nova denúncia (POST /denuncias)
export const createDenuncia = async (data: IRequestDenuncia): Promise<Denuncia> => {
    const response = await api.post('/denuncias', data);
    return response.data.denuncia;
};

// 2. Lista denúncias (GET /denuncias)
// Usada pelo serviço genérico, mas mantida aqui para tipagem
export const listDenuncias = async (): Promise<Denuncia[]> => {
    const response = await api.get('/denuncias');
    return response.data;
};