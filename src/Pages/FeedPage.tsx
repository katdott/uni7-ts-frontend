// src/Pages/FeedPage.tsx

import React, { useState, useEffect } from 'react';
import styles from './FeedPage.module.css'; // Estilos da página

// IMPORTAÇÕES DE COMPONENTES (como são valores/funções exportados como default, não precisam de 'type')
import PostagemForm from '../components/PostagemForm/PostagemForm'; // Formulário
import FeedItem from '../components/FeedItem/FeedItem';       // Item de exibição

// IMPORTAÇÕES DE VALORES (Funções)
import { listUsuarios } from '../services/UsuarioService';
import { fetchFeedItems } from '../services/PostagemService';

// IMPORTAÇÕES DE TIPOS/INTERFACES (Devem usar 'type')
import type { Usuario } from '../services/UsuarioService';
import type { Postagem, Category } from '../services/PostagemService';

const FeedPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('denuncias');
  const [items, setItems] = useState<Postagem[] | Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Função para Carregar Itens do Feed ---
  const fetchItems = async (category: Category) => {
    setLoading(true);
    setError(null);
    try {
      let data: any[] = [];

      // Lógica de busca com base na categoria
      if (category === 'usuarios') {
        data = await listUsuarios(); // Usa o serviço de Usuários (GET /usuarios)
      } else {
        data = await fetchFeedItems(category); // Usa o serviço genérico (GET /denuncias ou /avisos)
      }

      setItems(data);
    } catch (err: any) {
      setError(err.message);
      setItems([]); // Limpa a lista em caso de erro
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