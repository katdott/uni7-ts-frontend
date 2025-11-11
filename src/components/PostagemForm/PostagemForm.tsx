// src/components/PostagemForm/PostagemForm.tsx

import React, { useState } from 'react';
import styles from './PostagemForm.module.css';
import { createUsuario, getAllUsuarios } from '../../features/usuario/usuario.service';
import { createDenuncia } from '../../features/denuncia/denuncia.service';
import { createAviso } from '../../features/aviso/aviso.service';
import type { PostCategory } from '../../types';

interface Props {
    onSuccess: () => void;
}

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
        Categoria: 'denuncias',
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
            const usuarios = await getAllUsuarios();
            let userId: number;
            
            const usuarioExistente = usuarios.find(u => u.NomeUsuario === formData.NomeUsuario);
            
            if (usuarioExistente) {
                userId = usuarioExistente.IdUsuario;
            } else {
                const novoUsuario = await createUsuario({
                    NomeUsuario: formData.NomeUsuario,
                    Senha: formData.Senha
                });
                userId = novoUsuario.IdUsuario;
            }

            const postagemData = {
                IdUsuario: userId,
                Nome: formData.Nome,
                Descricao: formData.Descricao
            };

            if (formData.Categoria === 'denuncias') {
                await createDenuncia(postagemData);
            } else {
                await createAviso(postagemData);
            }
            
            setFormData((prev: FormState) => ({ 
                 ...prev, 
                 Nome: '', 
                 Descricao: '' 
            })); 
            onSuccess();
            
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao criar postagem';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h4 className={styles.title}>Nova Postagem</h4>
            
            <select name="Categoria" value={formData.Categoria} onChange={handleChange} required disabled={loading}>
                <option value="denuncias">Denúncia</option>
                <option value="avisos">Aviso</option>
            </select>
            
            <input type="text" name="NomeUsuario" placeholder="Nome de Usuário" value={formData.NomeUsuario} onChange={handleChange} required disabled={loading} />
            <input type="password" name="Senha" placeholder="Senha" value={formData.Senha} onChange={handleChange} required disabled={loading} />
            
            <input type="text" name="Nome" placeholder="Título" value={formData.Nome} onChange={handleChange} required disabled={loading} />
            <textarea name="Descricao" placeholder="Descrição" value={formData.Descricao} onChange={handleChange} rows={3} required disabled={loading} />
            
            <button type="submit" className={styles.createButton} disabled={loading}>
                {loading ? 'Postando...' : `Postar ${formData.Categoria === 'denuncias' ? 'Denúncia' : 'Aviso'}`}
            </button>
            
            {error && (
                <div style={{ 
                    color: 'red', 
                    backgroundColor: '#ffe6e6', 
                    padding: '10px', 
                    borderRadius: '5px',
                    border: '1px solid #ff9999',
                    marginTop: '10px'
                }}>
                    <strong>❌ Erro:</strong> {error}
                </div>
            )}
        </form>
    );
};

export default PostagemForm;
