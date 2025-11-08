// src/services/PostagemService.ts

import api from '../api/api';
import type { Denuncia, IRequestDenuncia } from './DenunciaService';
import type { Aviso, IRequestAviso } from './AvisoService';

// Tipos de Categorias para o frontend e para o endpoint
export type PostCategory = 'denuncias' | 'avisos';
export type Category = PostCategory | 'usuarios';

// Tipos de dados de postagem (união de Denuncia e Aviso)
export type Postagem = Denuncia | Aviso;

// Função genérica para criar Denúncia ou Aviso (POST)
export const createPostagem = async (
    category: PostCategory,
    data: IRequestDenuncia | IRequestAviso
): Promise<Postagem> => {
    try {
        // Envia para /uni7/denuncias ou /uni7/avisos
        const response = await api.post(`/${category}`, data);
        
        // O backend retorna { mensagem: "...", denuncia: {...} } ou { mensagem: "...", aviso: {...} }
        // Usamos category.slice(0, -1) para obter 'denuncia' ou 'aviso' da resposta.
        return response.data[category.slice(0, -1)]; 
    } catch (error) {
        throw new Error(`Falha ao criar ${category}.`);
    }
};

// Função genérica para buscar os itens do feed (GET)
// A função de fetch para 'usuarios' será diferente (listUsuarios), mas tipamos aqui para clareza
export const fetchFeedItems = async (category: PostCategory): Promise<Postagem[]> => {
    try {
        const response = await api.get(`/${category}`);
        return response.data;
    } catch (error) {
        throw new Error(`Falha ao buscar a categoria: ${category}.`);
    }
};