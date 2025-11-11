// src/components/FeedItem/FeedItem.tsx

import React from 'react';
import styles from './FeedItem.module.css';

// Types
import type { Usuario, Denuncia, Aviso, Category } from '../../types';

interface FeedItemProps {
  item: Usuario | Denuncia | Aviso;
  category: Category;
}

const FeedItem: React.FC<FeedItemProps> = ({ item, category }) => {
  const isUser = category === 'usuarios';
  
  if (isUser) {
    const user = item as Usuario;
    // Renderização para a categoria USUÁRIOS
    return (
      <div className={styles.itemCard}>
        <h4>👤 Usuário ID: {user.IdUsuario}</h4>
        <p>Nome: <strong>{user.NomeUsuario}</strong></p>
        <small>Status: {user.Ativa ? 'Ativo' : 'Inativo'}</small>
      </div>
    );
  }

  // Renderização para DENÚNCIAS ou AVISOS
  const typeLabel = category === 'denuncias' ? 'DENÚNCIA' : 'AVISO';
  const post = category === 'denuncias' ? (item as Denuncia) : (item as Aviso);

  return (
    <div className={styles.itemCard}>
      <h4>
        <span className={styles.typeHighlight}>
          [{typeLabel}]
        </span>
        {' '}
        {post.Nome}
      </h4>
      <p>{post.Descricao}</p>
      <small>
        Postado por:
        <strong> {post.usuario.NomeUsuario}</strong> (ID {post.IdUsuario})
        {' '}em {new Date(post.Inclusao).toLocaleDateString()}
      </small>
    </div>
  );
};


export default FeedItem;