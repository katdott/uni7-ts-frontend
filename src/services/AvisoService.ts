// src/services/AvisoService.ts

import api from '../api/api';

// Interface para os dados que o frontend envia
export interface IRequestAviso {
    IdUsuario: number;
    Nome: string;
    Descricao: string;
}

// Interface para o objeto de Aviso que o backend retorna
export interface Aviso {
    IdAviso: number;
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

// 1. Cria um novo aviso (POST /avisos)
export const createAviso = async (data: IRequestAviso): Promise<Aviso> => {
    const response = await api.post('/avisos', data);
    return response.data.aviso;
};

// 2. Lista avisos (GET /avisos)
// Usada pelo serviço genérico, mas mantida aqui para tipagem
export const listAvisos = async (): Promise<Aviso[]> => {
    const response = await api.get('/avisos');
    return response.data;
};