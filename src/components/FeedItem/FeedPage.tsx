// src/components/FeedItem/FeedItem.tsx

import React from 'react';
import styles from './FeedItem.module.css';
import type { Postagem, Category } from '../../services/PostagemService';
import type { Usuario } from '../../services/UsuarioService';

interface FeedItemProps {
  item: Postagem | Usuario;
  category: Category;
}

const FeedItem: React.FC<FeedItemProps> = ({ item, category }) => {
  const isUser = category === 'usuarios';
  const post = item as Postagem;
  const user = item as Usuario;

  if (isUser) {
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
  const typeLabel = category === 'denuncias' ? 'Denúncia' : 'Aviso';

  return (
    <div className={styles.itemCard}>
      <h4>[{typeLabel.toUpperCase()}] {post.Nome}</h4>
      <p>{post.Descricao}</p>
      <small>
        Postado por:
        <strong> {post.usuario?.NomeUsuario || 'Usuário Desconhecido'}</strong> (ID {post.IdUsuario})
        em {new Date(post.Inclusao).toLocaleDateString()}
      </small>
    </div>
  );
};

// **PONTO CHAVE:** EXPORTAÇÃO DEFAULT PARA SER IMPORTADO COMO VALOR
export default FeedItem;