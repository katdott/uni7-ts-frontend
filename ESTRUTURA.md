# Estrutura do Frontend - Uni7

## 📁 Estrutura Organizada (Inspirada no Backend)

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout root com tema MUI
│   ├── page.tsx                 # Página inicial (/)
│   ├── avisos/
│   │   └── page.tsx            # Página de avisos (/avisos)
│   └── denuncias/
│       └── page.tsx            # Página de denúncias (/denuncias)
│
├── components/                   # Componentes reutilizáveis
│   └── Layout/
│       └── Navbar/
│           └── Navbar.tsx      # Navbar com navegação
│
├── services/                     # Camada de serviços (API calls)
│   ├── aviso.service.ts        # Serviço CRUD de Avisos
│   ├── denuncia.service.ts     # Serviço CRUD de Denúncias
│   └── usuario.service.ts      # Serviço CRUD de Usuários
│
├── types/                        # Types organizados por entidade
│   ├── index.ts                # Barrel export de todos os types
│   │
│   ├── aviso/
│   │   ├── index.ts            # Barrel export de Aviso
│   │   ├── Aviso.model.ts      # Model da entidade
│   │   └── IAvisoDTO.ts        # DTOs (Create, Update)
│   │
│   ├── denuncia/
│   │   ├── index.ts            # Barrel export de Denuncia
│   │   ├── Denuncia.model.ts   # Model da entidade
│   │   └── IDenunciaDTO.ts     # DTOs (Create, Update)
│   │
│   └── usuario/
│       ├── index.ts            # Barrel export de Usuario
│       ├── Usuario.model.ts    # Model da entidade
│       └── IUsuarioDTO.ts      # DTOs (Create, Update)
│
├── api/
│   └── api.ts                  # Configuração do Axios
│
└── theme.ts                     # Tema customizado do MUI
```

## 🎯 Organização dos Types (Seguindo Padrão Backend)

### Antes (Bagunçado)
```
types/
  ├── aviso.types.ts           # Tudo misturado
  ├── denuncia.types.ts        # Difícil de manter
  └── usuario.types.ts
```

### Depois (Organizado)
```
types/
  ├── index.ts                 # Export centralizado
  ├── aviso/
  │   ├── index.ts            # Export do módulo
  │   ├── Aviso.model.ts      # Model separado
  │   └── IAvisoDTO.ts        # DTOs separados
  ├── denuncia/
  │   ├── index.ts
  │   ├── Denuncia.model.ts
  │   └── IDenunciaDTO.ts
  └── usuario/
      ├── index.ts
      ├── Usuario.model.ts
      └── IUsuarioDTO.ts
```

## 💡 Vantagens da Nova Estrutura

### 1. **Separação de Responsabilidades**
- **Models**: Definição das entidades
- **DTOs**: Objetos de transferência de dados
- **Services**: Lógica de comunicação com API
- **Pages**: Apresentação e UI

### 2. **Facilidade de Manutenção**
- Cada arquivo tem uma responsabilidade única
- Fácil de encontrar e modificar código
- Reduz acoplamento entre módulos

### 3. **Escalabilidade**
- Fácil adicionar novos módulos (ex: comentarios, categorias)
- Padrão consistente em todo projeto
- Barrel exports simplificam imports

### 4. **Import Limpo**
```typescript
// Antes (bagunçado)
import { Aviso, CreateAvisoRequest, UpdateAvisoRequest } from '../types/aviso.types';

// Depois (limpo)
import type { Aviso, CreateAvisoDTO, UpdateAvisoDTO } from '../types/aviso';
// ou
import type { Aviso, CreateAvisoDTO, UpdateAvisoDTO } from '../types';
```

## 📋 Nomenclatura Padronizada

### Models
- `Aviso.model.ts` - Entidade principal
- `Denuncia.model.ts`
- `Usuario.model.ts`

### DTOs
- `IAvisoDTO.ts` - Data Transfer Objects
  - `CreateAvisoDTO` - Criar
  - `UpdateAvisoDTO` - Atualizar
- Mesmo padrão para Denuncia e Usuario

### Services
- `aviso.service.ts` - Serviços de API
- `denuncia.service.ts`
- `usuario.service.ts`

## 🔄 Comparação com Backend

### Backend (Uni7-ts)
```
src/
├── aviso/
│   ├── model/
│   │   └── aviso.ts
│   ├── interfaces/
│   │   └── IAvisoRepository.ts
│   ├── repository/
│   │   └── AvisoRepository.ts
│   └── controller/
│       ├── create/
│       ├── update/
│       └── ...
```

### Frontend (uni7-ts-frontend) - Alinhado
```
src/
├── types/
│   └── aviso/
│       ├── Aviso.model.ts      # Similar ao model/
│       └── IAvisoDTO.ts        # Similar aos DTOs
├── services/
│   └── aviso.service.ts        # Similar ao repository/
└── app/
    └── avisos/
        └── page.tsx            # Similar ao controller/
```

## ✅ Checklist de Organização

- [x] Types separados por entidade
- [x] Models e DTOs em arquivos distintos
- [x] Barrel exports em cada módulo
- [x] Services com métodos CRUD completos
- [x] Nomenclatura consistente
- [x] Imports limpos usando barrel exports
- [x] Estrutura escalável para novos módulos

## 🚀 Como Adicionar um Novo Módulo

Exemplo: Adicionar módulo "Comentarios"

1. **Criar pasta de types**:
```
src/types/comentario/
  ├── index.ts
  ├── Comentario.model.ts
  └── IComentarioDTO.ts
```

2. **Adicionar ao barrel export principal**:
```typescript
// src/types/index.ts
export type { Comentario, CreateComentarioDTO, UpdateComentarioDTO } from './comentario';
```

3. **Criar service**:
```
src/services/comentario.service.ts
```

4. **Criar página**:
```
src/app/comentarios/page.tsx
```

---

**Estrutura organizada e escalável, alinhada com as melhores práticas! 🎉**
