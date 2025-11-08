// src/components/FeedItem/FeedItem.tsx

import React from 'react';
import styles from './FeedItem.module.css'; // Importa estilos modulares
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
  // Usamos UPPERCASE na label para visual de destaque
  const typeLabel = category === 'denuncias' ? 'DENÚNCIA' : 'AVISO';

  return (
    <div className={styles.itemCard}>
      <h4>
        {/* Usamos <span> e a classe de destaque para aplicar cor e negrito APENAS ao tipo */}
        <span className={styles.typeHighlight}>
          [{typeLabel}]
        </span>
        {/* O restante do texto (o Nome do post) fica com o estilo padrão do <h4> */}
        {post.Nome}
      </h4>
      <p>{post.Descricao}</p>
      <small>
        Postado por:
        <strong> {post.usuario?.NomeUsuario || 'Usuário Desconhecido'}</strong> (ID {post.IdUsuario})
        em {new Date(post.Inclusao).toLocaleDateString()}
      </small>
    </div>
  );
};


export default FeedItem;