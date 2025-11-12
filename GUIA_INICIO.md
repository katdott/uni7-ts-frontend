# 🚀 Guia de Início Rápido - CondoManager

## 📦 Instalação

### 1. **Instalar Dependências**

```bash
cd uni7-ts-frontend
npm install
```

### 2. **Verificar Backend**

Certifique-se de que o backend está rodando:

```bash
cd ../Uni7-ts
npm run dev
```

O backend deve estar disponível em: `http://localhost:3000`

### 3. **Iniciar Frontend**

```bash
cd ../uni7-ts-frontend
npm run dev
```

O frontend estará disponível em: `http://localhost:3001`

---

## 🎯 **Primeiros Passos**

### **1. Criar uma Conta**

1. Acesse `http://localhost:3001/cadastro`
2. Preencha:
   - Nome de Usuário: `admin`
   - Senha: `123456`
   - Confirmar Senha: `123456`
3. Clique em "Criar Conta"
4. Você será redirecionado para o login

### **2. Fazer Login**

1. Acesse `http://localhost:3001/login`
2. Use as credenciais criadas
3. Clique em "Entrar no Sistema"

### **3. Explorar o Dashboard**

Após o login, você verá:
- 📊 Estatísticas do condomínio
- 🔔 Atividades recentes
- ⚡ Ações rápidas
- 📈 Performance mensal

---

## 🧪 **Testando Funcionalidades**

### **Avisos**

1. Vá para **Avisos** no menu
2. Clique em "Novo Aviso"
3. Preencha:
   - ID do Usuário: `1`
   - Título: `Manutenção do Elevador`
   - Descrição: `O elevador passará por manutenção na próxima semana`
4. Clique em "Criar Aviso"

**Recursos para testar**:
- 🔍 Busca por título ou descrição
- 📋 Toggle entre visualização Grid/Lista
- ✏️ Editar aviso (ícone de lápis)
- 🗑️ Excluir aviso (ícone de lixeira)

### **Denúncias**

1. Vá para **Denúncias** no menu
2. Clique em "Nova Denúncia"
3. Preencha:
   - ID do Usuário: `1`
   - Título: `Barulho excessivo - Apto 301`
   - Descrição: `Som alto após às 22h`
4. Clique em "Registrar Denúncia"

**Recursos para testar**:
- 🎯 Filtro por Status (Aberta, Em análise, Resolvida, Rejeitada)
- ⚡ Filtro por Prioridade (Baixa, Média, Alta, Urgente)
- 🔍 Busca textual
- 📋 Toggle entre Grid/Lista
- 🎨 Note as cores de prioridade na borda dos cards

---

## 🎨 **Componentes Principais**

### **Dashboard (`/`)**
- Cards de estatísticas com ícones
- Ações rápidas com gradiente
- Timeline de atividades recentes
- Resumo rápido com métricas
- Barra de performance

### **Navbar**
- Logo CondoManager
- Menu de navegação
- Avatar do usuário
- Badge de notificações (mock: 3)
- Menu dropdown com logout

### **Avisos (`/avisos`)**
- Toolbar com busca e filtros
- Cards com status "ATIVO"
- Menu de ações (três pontos)
- Modal de criação/edição
- Empty state quando vazio

### **Denúncias (`/denuncias`)**
- Filtros avançados (Status + Prioridade)
- Cards com borda colorida por prioridade
- Chips de status com ícones
- Sistema de priorização visual
- Toggle Grid/Lista

### **Login (`/login`)**
- Design split-screen
- Gradiente roxo
- Toggle mostrar/ocultar senha
- Validações em tempo real
- Link para cadastro

### **Cadastro (`/cadastro`)**
- Design split-screen
- Gradiente verde
- Barra de força da senha
- Validação de confirmação
- Success feedback

---

## 🎯 **Atalhos do Teclado** (Futuro)

| Atalho | Ação |
|--------|------|
| `Ctrl + K` | Busca global |
| `Ctrl + N` | Novo aviso |
| `Ctrl + D` | Nova denúncia |
| `Ctrl + /` | Ajuda |

*(Ainda não implementado - sugestão futura)*

---

## 🐛 **Troubleshooting**

### **Erro: "Cannot connect to backend"**

**Solução**:
1. Verifique se o backend está rodando
2. Confirme a porta em `src/api/api.ts`:
   ```typescript
   baseURL: 'http://localhost:3000'
   ```

### **Erro: "Network Error"**

**Solução**:
1. Verifique o CORS no backend
2. Reinicie backend e frontend
3. Limpe o cache do navegador

### **Página em branco**

**Solução**:
1. Abra o console (F12)
2. Verifique erros de JavaScript
3. Tente acessar diretamente a rota: `http://localhost:3001`

### **Componentes não carregam**

**Solução**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📊 **Estrutura de Dados Mock**

Os dados de status e prioridade nas denúncias são **mock** (simulados) no frontend.

Para implementar de verdade:

1. Adicione os campos no schema do Prisma:
   ```prisma
   model Denuncia {
     // ...campos existentes
     status     String @default("Aberta") // "Aberta", "Em análise", "Resolvida", "Rejeitada"
     prioridade String @default("Média")  // "Baixa", "Média", "Alta", "Urgente"
   }
   ```

2. Execute a migration:
   ```bash
   npx prisma migrate dev --name add-status-prioridade
   ```

3. Atualize os DTOs e repository no backend

---

## 🔧 **Configurações Opcionais**

### **Mudar Porta do Frontend**

Edite `package.json`:
```json
{
  "scripts": {
    "dev": "next dev --port 3002"
  }
}
```

### **Habilitar TypeScript Strict Mode**

Edite `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

---

## 📚 **Recursos Adicionais**

- 📄 **ATUALIZACOES_DESIGN.md** - Detalhes de todas as mudanças
- 💡 **SUGESTOES_FUTURAS.md** - Próximas implementações
- 📖 **README.md** - Documentação do projeto

---

## 🆘 **Precisa de Ajuda?**

1. Verifique os arquivos de documentação
2. Consulte os comentários no código
3. Abra uma issue no repositório

---

**Bom desenvolvimento! 🚀**

**Última atualização**: Novembro 2025
