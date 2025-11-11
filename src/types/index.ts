// src/types/index.ts
// Barrel export principal para todos os tipos

// Aviso
export type { Aviso, CreateAvisoDTO, UpdateAvisoDTO } from './aviso';

// Denuncia
export type { Denuncia, CreateDenunciaDTO, UpdateDenunciaDTO } from './denuncia';

// Usuario
export type { Usuario, CreateUsuarioDTO, UpdateUsuarioDTO } from './usuario';

// Types auxiliares
export type Category = 'usuarios' | 'denuncias' | 'avisos';
export type PostCategory = 'denuncias' | 'avisos';
