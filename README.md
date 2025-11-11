# Sistema Uni7 - Frontend

Frontend desenvolvido com **Next.js 15**, **TypeScript** e **MUI Material** para o sistema de gestão de Avisos e Denúncias.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **MUI Material** - Biblioteca de componentes UI
- **Axios** - Cliente HTTP
- **Emotion** - Estilização CSS-in-JS

## 🎨 Paleta de Cores

A paleta de cores original foi mantida e integrada ao tema do MUI:

- **Primary**: `#2E86DE` (azul) - Botões principais
- **Secondary**: `#00B894` (verde) - Botões de criação
- **Error**: `#e74c3c` (vermelho) - Ações de exclusão
- **Text Secondary**: `#636E72` (cinza escuro) - Destaques de texto
- **Background**: `rgb(240, 247, 245)` (verde claro) - Fundo geral
- **Paper**: `#D9D9D9` (cinza claro) - Fundo de cards

## 📦 Instalação

```bash
# Já está com as dependências instaladas
# Caso precise reinstalar:
npm install
```

## ▶️ Executar o Projeto

```bash
npm run dev
```

O frontend estará rodando em: `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout raiz com tema MUI
│   ├── page.tsx           # Página inicial
│   ├── avisos/
│   │   └── page.tsx      # Página de Avisos
│   └── denuncias/
│       └── page.tsx      # Página de Denúncias
├── components/
│   └── Layout/
│       └── Navbar/       # Navbar com navegação
├── services/              # Serviços de API
│   ├── aviso.service.ts
│   ├── denuncia.service.ts
│   └── usuario.service.ts
├── types/                 # TypeScript types
│   ├── aviso.types.ts
│   ├── denuncia.types.ts
│   └── usuario.types.ts
├── api/                   # Configuração do Axios
│   └── api.ts
└── theme.ts              # Tema customizado do MUI
```

## 🌐 Rotas

- `/` - Página inicial
- `/avisos` - Gestão de Avisos
- `/denuncias` - Gestão de Denúncias

## ✨ Funcionalidades

### Avisos
- ✅ Listar todos os avisos
- ✅ Criar novo aviso
- ✅ Editar aviso existente
- ✅ Excluir aviso (com confirmação)
- ✅ Exibir informações do usuário criador
- ✅ Exibir datas formatadas

### Denúncias
- ✅ Listar todas as denúncias
- ✅ Criar nova denúncia
- ✅ Editar denúncia existente
- ✅ Excluir denúncia (com confirmação)
- ✅ Exibir informações do usuário criador
- ✅ Exibir datas formatadas

## 🔗 Integração com Backend

O frontend se conecta ao backend em:
`http://localhost:3000/uni7`

**Certifique-se de que o backend está rodando antes de usar o frontend.**

## 🎯 Componentes MUI Utilizados

- **AppBar** - Navbar fixo
- **Container** - Limitador de largura
- **Grid** - Sistema de grid responsivo
- **Card** - Cards para exibição de dados
- **Button** - Botões com variantes
- **TextField** - Campos de formulário
- **Dialog** - Modais para formulários
- **Chip** - Badges para identificação
- **CircularProgress** - Indicador de loading
- **Alert** - Mensagens de erro/sucesso

## 📱 Responsividade

O frontend é totalmente responsivo usando o sistema de Grid do MUI:
- **Desktop** (lg): 3 colunas
- **Tablet** (md): 2 colunas
- **Mobile** (xs): 1 coluna

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm start        # Executa build de produção
npm run lint     # Executa linter
```

## 🔧 Configurações

### next.config.ts
Configuração do Next.js com React Strict Mode ativado.

### theme.ts
Tema customizado do MUI com as cores do projeto original.

### tsconfig.json
Configuração TypeScript otimizada para Next.js 15.

## 📝 Observações

1. **App Router**: Utilizando o novo App Router do Next.js 15
2. **Server/Client Components**: Páginas marcadas com 'use client' onde necessário
3. **MUI Integration**: Integração completa com sistema de temas do MUI
4. **TypeScript**: 100% tipado
5. **Serviços Reutilizáveis**: Mesmos serviços da versão anterior
6. **Types Mantidos**: Todos os types originais preservados

---

**Desenvolvido com Next.js + TypeScript + MUI Material** 🚀
