// src/Pages/FeedPage.tsx

import React, { useState, useEffect } from 'react';
import styles from './FeedPage.module.css';

// Componentes
import PostagemForm from '../components/PostagemForm/PostagemForm';
import FeedItem from '../components/FeedItem/FeedItem';

// Services
import { getAllUsuarios } from '../features/usuario/usuario.service';
import { getAllDenuncias } from '../features/denuncia/denuncia.service';
import { getAllAvisos } from '../features/aviso/aviso.service';

// Types
import type { Usuario, Denuncia, Aviso, Category } from '../types';

const FeedPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('denuncias');
  const [items, setItems] = useState<Usuario[] | Denuncia[] | Aviso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar itens do feed
  const fetchItems = async (category: Category) => {
    setLoading(true);
    setError(null);
    try {
      let data: Usuario[] | Denuncia[] | Aviso[] = [];

      // Lógica de busca com base na categoria
      if (category === 'usuarios') {
        data = await getAllUsuarios();
      } else if (category === 'denuncias') {
        data = await getAllDenuncias();
      } else if (category === 'avisos') {
        data = await getAllAvisos();
      }

      setItems(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // --- Executa a busca sempre que a categoria mudar ---
  useEffect(() => {
    fetchItems(activeCategory);
  }, [activeCategory]);

  // Função para recarregar o feed após a criação de um novo post
  const handlePostSuccess = () => {
    // Recarrega o feed da categoria atual para ver o novo item
    fetchItems(activeCategory);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Feed UNI7</h1>

      {/* Seção do Formulário de Criação */}
      <div className={styles.formSection}>
        <PostagemForm onSuccess={handlePostSuccess} />
      </div>

      {/* Filtros de Categoria */}
      <div className={styles.filterContainer}>
        <button
          className={styles.filterButton}
          onClick={() => setActiveCategory('denuncias')}
          disabled={activeCategory === 'denuncias'}
        >
          Denúncias
        </button>
        <button
          className={styles.filterButton}
          onClick={() => setActiveCategory('avisos')}
          disabled={activeCategory === 'avisos'}
        >
          Avisos
        </button>
        <button
          className={styles.filterButton}
          onClick={() => setActiveCategory('usuarios')}
          disabled={activeCategory === 'usuarios'}
        >
          Usuários
        </button>
      </div>

      {/* Visualização do Feed */}
      <h2>{activeCategory.toUpperCase()} ({items.length})</h2>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro ao carregar o feed: {error}</p>}

      <div className={styles.contentGrid}>
        {!loading && items.length > 0 ? (
          items.map((item: any) => (
            <FeedItem
              key={item.IdUsuario || item.IdDenuncia || item.IdAviso}
              item={item}
              category={activeCategory}
            />
          ))
        ) : (
          !loading && !error && <p>Nenhum item encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  );
};

export default FeedPage;