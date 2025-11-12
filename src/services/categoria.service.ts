import api from '../api/api';
import type { Categoria, CreateCategoriaDTO } from '../types/categoria';

export class CategoriaService {
    static async getAll(): Promise<Categoria[]> {
        const response = await api.get<Categoria[]>('/categorias');
        return response.data;
    }

    static async create(data: CreateCategoriaDTO): Promise<Categoria> {
        const response = await api.post<Categoria>('/categorias', data);
        return response.data;
    }
}
