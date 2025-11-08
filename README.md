# 🚀 GUIA DE INÍCIO RÁPIDO: UNI7 - SISTEMA DE FEED

Este guia detalha as funcionalidades do Frontend em React/Vite e as instruções necessárias para testar a aplicação em conjunto com o Backend SQL Server.

---

## 1. ✨ FUNCIONALIDADES DO FRONTEND (REACT/VITE)

O Frontend implementa soluções avançadas para a comunicação com a API, focando na usabilidade e integridade dos dados, sem modificar os endpoints do Backend.

### A. 🔑 Lógica "Encontre ou Crie" (Upsert de Usuário)

O componente **`PostagemForm`** abstrai a necessidade de um sistema de login, garantindo que toda postagem seja associada a um `IdUsuario` válido:

1.  **Input:** O usuário fornece `Nome de Usuário` e `Senha` no formulário.
2.  **Busca (Encontre):** O Frontend faz um `GET /usuarios` para obter a lista completa de usuários.
3.  **Criação (Crie):** Se o `NomeUsuario` **não for encontrado**, o Frontend faz um `POST /usuarios` para criar o usuário e obtém o novo `IdUsuario`.
4.  **Postagem:** O `IdUsuario` (existente ou novo) é usado para criar a Denúncia ou Aviso (`POST /denuncias` ou `/avisos`).

### B. 📰 Feed Centralizado com Filtros

O componente **`FeedPage`** unifica a visualização de diferentes endpoints:

| Categoria de Filtro | Ação no Frontend | Endpoint Consumido |
| :--- | :--- | :--- |
| **Denúncias** | Lista todos os posts de Denúncias. | `GET /uni7/denuncias` |
| **Avisos** | Lista todos os posts de Avisos. | `GET /uni7/avisos` |
| **Usuários** | Lista todos os usuários cadastrados. | `GET /uni7/usuarios` |

---

## 2. 💻 INSTALAÇÃO E EXECUÇÃO

O projeto requer que o Backend e o Frontend sejam iniciados separadamente.

### 2.1. 💾 Configuração do Backend (API - `uni7-ts-backend`)

1.  **Pré-requisitos:** SQL Server instalado e o serviço rodando (Protocolo TCP/IP habilitado).
2.  **Configuração de Conexão (`.env`):** Edite o arquivo `.env` para apontar para seu servidor:

    ```env
    # Sugestão: Use Autenticação do Windows para facilitar o desenvolvimento
    DATABASE_URL="sqlserver://localhost:1433;database=UniDB;trusted_connection=true;encrypt=true;trustServerCertificate=true"
    PORT=3000
    ```

3.  **Dependências e Migrações:**
    ```bash
    cd uni7-ts-backend
    npm install
    npx prisma migrate dev --name inicial # Cria o banco UniDB e as tabelas
    ```

4.  **Execução da API:**
    ```bash
    npm run dev
    # A API estará rodando em http://localhost:3000
    ```

### 2.2. ⚛️ Configuração do Frontend (React/Vite - `uni7-ts-frontend`)

1.  **Dependências:**
    ```bash
    cd uni7-ts-frontend
    npm install
    ```
2.  **Execução do Frontend:**
    ```bash
    npm run dev
    # O Frontend estará acessível em http://localhost:5173
    ```
    *(O arquivo `src/api/api.ts` já está configurado para se comunicar com a API em `http://localhost:3000/uni7`).*

---

## 3. 🧪 TESTES DE FUNCIONALIDADE

Use o frontend (`http://localhost:5173`) para validar a lógica de *Upsert* e filtragem.

### Teste 1: Criação de Novo Usuário e Postagem (FLUXO UPSERT)

1.  **Cenário:** O usuário não existe no banco de dados.
2.  **Ação:** No formulário, use um `Nome de Usuário` único (Ex: `UserNovo`).
3.  **Resultado Esperado:** A postagem é criada, e o usuário **é automaticamente adicionado** à tabela `Usuarios` do SQL Server.

### Teste 2: Reutilização de Usuário Existente (FLUXO ENCONTRE)

1.  **Cenário:** O usuário já existe (use o mesmo `Nome de Usuário` do Teste 1: `UserNovo`).
2.  **Ação:** Crie uma nova postagem (ex: um Aviso) usando as mesmas credenciais.
3.  **Resultado Esperado:** A postagem é criada **imediatamente**. Verifique a lista de "Usuários" — o usuário `UserNovo` **não** foi duplicado, provando que o ID existente foi reutilizado.

### Teste 3: Validação dos Filtros

1.  Crie pelo menos uma Denúncia, um Aviso e um Usuário.
2.  Clique no filtro **"Denúncias"** e **"Avisos"** para garantir que apenas o conteúdo relevante de cada endpoint seja exibido.
3.  Clique no filtro **"Usuários"** para verificar se todos os usuários criados estão sendo listados.