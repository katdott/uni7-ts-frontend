// src/components/PostagemForm/PostagemForm.tsx

import React, { useState } from 'react';
import styles from './PostagemForm.module.css'; // Importa estilos modulares
import { findOrCreateUser } from '../../services/UsuarioService';
import { createPostagem } from '../../services/PostagemService';
import type { PostCategory } from '../../services/PostagemService';
import type { IRequestDenuncia } from '../../services/DenunciaService';

interface Props {
    onSuccess: () => void;
}

// Estado que engloba dados do usuário e do post
interface FormState {
    NomeUsuario: string;
    Senha: string;
    Categoria: PostCategory;
    Nome: string;
    Descricao: string;
}

const PostagemForm: React.FC<Props> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<FormState>({
        NomeUsuario: '',
        Senha: '',
        Categoria: 'denuncias', // Valor inicial
        Nome: '',
        Descricao: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // PASSO 1: ENCONTRE OU CRIE O USUÁRIO (LÓGICA UPSERT)
            const userCredentials = {
                NomeUsuario: formData.NomeUsuario,
                Senha: formData.Senha
            };
            const userId = await findOrCreateUser(userCredentials);

            // PASSO 2: CRIAÇÃO DA POSTAGEM GENÉRICA
            const postagemData: IRequestDenuncia = { // IRequestDenuncia e IRequestAviso têm a mesma estrutura
                IdUsuario: userId,
                Nome: formData.Nome,
                Descricao: formData.Descricao
            };

            await createPostagem(formData.Categoria, postagemData);
            
            // Sucesso: limpa campos de postagem e chama o recarregamento do feed
            setFormData(prev => ({ 
                 ...prev, 
                 Nome: '', 
                 Descricao: '' 
            })); 
            onSuccess();
            
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h4 className={styles.title}>Nova Postagem</h4>
            
            {/* 1. Seleção de Categoria */}
            <select name="Categoria" value={formData.Categoria} onChange={handleChange} required disabled={loading}>
                <option value="denuncias">Denúncia</option>
                <option value="avisos">Aviso</option>
            </select>
            
            {/* 2. Dados do Usuário (Upsert) */}
            <input type="text" name="NomeUsuario" placeholder="Nome de Usuário (Necessário para postar)" value={formData.NomeUsuario} onChange={handleChange} required disabled={loading} />
            <input type="password" name="Senha" placeholder="Senha" value={formData.Senha} onChange={handleChange} required disabled={loading} />
            
            {/* 3. Dados da Postagem */}
            <input type="text" name="Nome" placeholder="Título" value={formData.Nome} onChange={handleChange} required disabled={loading} />
            <textarea name="Descricao" placeholder="Descrição" value={formData.Descricao} onChange={handleChange} rows={3} required disabled={loading} />
            
            <button type="submit" className={styles.createButton} disabled={loading}>
                {loading ? 'Postando...' : `Postar ${formData.Categoria === 'denuncias' ? 'Denúncia' : 'Aviso'}`}
            </button>
            
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        </form>
    );
};

// **PONTO CHAVE:** EXPORTAÇÃO DEFAULT PARA SER IMPORTADO COMO VALOR
export default PostagemForm;