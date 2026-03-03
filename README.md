# 📚 Bibton - Frontend

Bibton é uma aplicação moderna de **gerenciamento de bibliotecas** construída com React e Vite. O sistema permite gerenciar usuários, livros, empréstimos, reservas e multas em uma biblioteca de forma eficiente e intuitiva.

---

## 🏗️ Arquitetura da Aplicação

### Visão Geral

A aplicação segue uma arquitetura baseada em **componentes React** com gerenciamento de estado através de **Context API**, comunicação com backend via **Axios** e roteamento com **React Router**. O styling é realizado com **Tailwind CSS**.

```
┌─────────────────────────────────────────────────────────┐
│                   Camada de Apresentação                 │
│        (Páginas, Componentes, Formulários)               │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────┐
│                   Context API (State)                    │
│    ├─ AuthContext (Autenticação & Usuário)             │
│    └─ ThemeContext (Tema Light/Dark)                    │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────┐
│              API Service (Axios Client)                  │
│    Requisições HTTP para Backend                        │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────┐
│              Backend API (Node.js/Express)               │
│    Base URL: https://biblioteca-gateway.onrender.com    │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack de Tecnologias

### Frontend Framework & Build
- **React 18.2.0** - Biblioteca UI baseada em componentes
- **Vite 5.0.0** - Build tool rápido e moderno
- **React Router v6** - Navegação e roteamento

### State Management & Forms
- **Context API** - Gerenciamento de estado global (Auth, Tema)
- **React Hook Form 7.47** - Gerenciamento de formulários otimizado
- **Zod 3.22** - Validação de schema de dados

### HTTP & Async
- **Axios 1.6** - Cliente HTTP com interceptadores
- **Date-fns 2.30** - Manipulação de datas

### UI & Styling
- **Tailwind CSS 3.3** - Framework CSS utilitário
- **Lucide React 0.294** - Ícones SVG modernos
- **React Toastify 9.1** - Notificações toast

### Utilities
- **clsx 2.0** - Construtor condicional de classes CSS

### Development Tools
- **ESLint 8.55** - Linter de código JavaScript
- **TypeScript Types** - Tipos para React e React DOM
- **PostCSS & Autoprefixer** - Pós-processamento CSS

---

## 📁 Estrutura do Projeto

```
bibton-frontend/
├── public/                      # Assets estáticos
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Componente principal de layout com sidebar/navbar
│   │   └── forms/
│   │       ├── UsuarioForm.jsx    # Formulário para criar/editar usuários
│   │       ├── LivroForm.jsx      # Formulário para criar/editar livros
│   │       ├── EmprestimoForm.jsx # Formulário para criar/editar empréstimos
│   │       └── ReservaForm.jsx    # Formulário para criar/editar reservas
│   │
│   ├── pages/                   # Páginas da aplicação
│   │   ├── Dashboard.jsx        # Página inicial com resumo
│   │   ├── Usuarios.jsx         # Página de gerenciamento de usuários
│   │   ├── Livros.jsx           # Página de gerenciamento de livros
│   │   ├── Emprestimos.jsx      # Página de gerenciamento de empréstimos
│   │   ├── Reservas.jsx         # Página de gerenciamento de reservas
│   │   └── Multas.jsx           # Página de gerenciamento de multas
│   │
│   ├── contexts/                # Context API para estado global
│   │   ├── AuthContext.jsx      # Contexto de autenticação e usuário
│   │   └── ThemeContext.jsx     # Contexto de tema (light/dark)
│   │
│   ├── config/
│   │   └── api.jsx              # Configuração do cliente Axios com interceptadores
│   │
│   ├── utils/
│   │   └── pdfGenerator.js      # Utilitário para gerar relatórios em PDF
│   │
│   ├── App.jsx                  # Componente raiz da aplicação
│   ├── main.jsx                 # Ponto de entrada da aplicação
│   └── index.css                # Estilos globais
│
├── index.html                   # Arquivo HTML principal
├── vite.config.js              # Configuração do Vite
├── tailwind.config.js          # Configuração do Tailwind CSS
├── postcss.config.js           # Configuração do PostCSS
├── eslint.config.js            # Configuração do ESLint
├── package.json                # Dependências e scripts
├── Dockerfile                  # Configuração para containerização
└── README.md                   # Este arquivo
```

---

## 🔑 Componentes Principais

### 1. **Layout** (`src/components/Layout.jsx`)
Componente wrapper principal que fornece:
- **Sidebar/Navbar responsiva** com navegação
- **Menu mobile** colapsável
- **Toggle de tema** (Light/Dark)
- **Botão de logout**
- **Renderização de rotas** com `<Outlet />`

**Principais funcionalidades:**
- Navegação entre páginas
- Alternância de tema claro/escuro
- Exibição de informações do usuário logado
- Design responsivo (desktop e mobile)

### 2. **Páginas da Aplicação**

#### Dashboard (`src/pages/Dashboard.jsx`)
- Página inicial com resumo geral
- Estatísticas da biblioteca
- Links rápidos para outras seções

#### Usuários (`src/pages/Usuarios.jsx`)
- Listagem de todos os usuários/membros
- CRUD (Create, Read, Update, Delete)
- Filtros e busca
- Integração com `UsuarioForm`

#### Livros (`src/pages/Livros.jsx`)
- Gerenciamento do catálogo de livros
- CRUD de livros
- Informações: título, autor, ISBN, quantidade, etc.
- Integração com `LivroForm`

#### Empréstimos (`src/pages/Emprestimos.jsx`)
- Registro de empréstimos de livros
- Controle de datas de devolução
- Status do empréstimo
- Alertas para atrasos
- Integração com `EmprestimoForm`

#### Reservas (`src/pages/Reservas.jsx`)
- Gerenciamento de reservas de livros
- Fila de espera
- Data de reserva e previsão de disponibilidade
- Integração com `ReservaForm`

#### Multas (`src/pages/Multas.jsx`)
- Registro de multas por atraso
- Valor e razão da multa
- Status de pagamento
- Histórico de multas

### 3. **Formulários** (`src/components/forms/`)
Todos os formulários utilizam **React Hook Form** com validação **Zod**:

- **UsuarioForm.jsx** - Campos: nome, email, telefone, cargo
- **LivroForm.jsx** - Campos: título, autor, ISBN, quantidade, gênero
- **EmprestimoForm.jsx** - Campos: usuário, livro, data empréstimo, data devolução
- **ReservaForm.jsx** - Campos: usuário, livro, data reserva

**Características:**
- Validação em tempo real
- Mensagens de erro claras
- Submissão otimizada
- Feedback visual de loading

---

## 🌐 Contextos de Estado (Context API)

### AuthContext (`src/contexts/AuthContext.jsx`)
Gerencia autenticação e dados do usuário:

```javascript
useAuth() // Hook para acessar contexto

// Propriedades disponíveis:
{
  user,      // Objeto do usuário logado { nome, cargo }
  loading,   // Estado de carregamento
  login,     // Função async(email, senha)
  logout     // Função de logout
}
```

**Funcionalidades:**
- Recuperação de token do localStorage
- Login/Logout
- Persistência de sessão
- Simulação de autenticação (backend real em produção)

**Credenciais padrão (simulação):**
- Email: `admin@biblioteca.com`
- Senha: `admin123`

### ThemeContext (`src/contexts/ThemeContext.jsx`)
Gerencia o tema da aplicação (light/dark):

```javascript
useTheme() // Hook para acessar contexto

// Propriedades disponíveis:
{
  theme,      // 'light' ou 'dark'
  toggleTheme // Função para alternar tema
}
```

**Funcionalidades:**
- Armazenamento de preferência no localStorage
- Aplicação de classe 'dark' no HTML
- Sincronização com CSS do Tailwind

---

## 🔌 API Service (`src/config/api.jsx`)

Cliente HTTP centralizado usando **Axios** com interceptadores automáticos:

### Configuração
```javascript
baseURL: https://biblioteca-gateway.onrender.com
headers: { 'Content-Type': 'application/json' }
```

### Interceptadores

**Request Interceptor:**
- Adiciona token JWT do localStorage no header `Authorization: Bearer {token}`

**Response Interceptor:**
- Trata erro 401 (Unauthorized) redirecionando para login
- Remove token expirado

### Métodos Disponíveis

#### Usuários
- `getUsuarios()` - GET `/usuarios`
- `getUsuario(id)` - GET `/usuarios/{id}`
- `createUsuario(data)` - POST `/usuarios`
- `updateUsuario(id, data)` - PUT `/usuarios/{id}`
- `deleteUsuario(id)` - DELETE `/usuarios/{id}`

#### Livros
- `getLivros()` - GET `/livros`
- `getLivro(id)` - GET `/livros/{id}`
- `createLivro(data)` - POST `/livros`
- `updateLivro(id, data)` - PUT `/livros/{id}`
- `deleteLivro(id)` - DELETE `/livros/{id}`

#### Empréstimos
- `getEmprestimos()` - GET `/emprestimos`
- `createEmprestimo(data)` - POST `/emprestimos`
- `updateEmprestimo(id, data)` - PUT `/emprestimos/{id}`

#### Reservas
- `getReservas()` - GET `/reservas`
- `createReserva(data)` - POST `/reservas`

#### Multas
- `getMultas()` - GET `/multas`

---

## 🎨 Tema e Styling

### Tailwind CSS
- Framework CSS utilitário para estilização rápida
- Configuração em `tailwind.config.js`
- Suporte a tema dark (classe `dark` no HTML)

### Ícones
- **Lucide React** para ícones SVG escaláveis
- Ícones usados: Home, Users, BookOpen, Calendar, Clock, AlertCircle, LogOut, Menu, etc.

### Notificações
- **React Toastify** para mensagens de sucesso/erro
- Posicionamento: top-right
- Auto-close: 3 segundos
- Temas compatíveis com light/dark

---

## 🚀 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
- Inicia servidor de desenvolvimento com Vite
- Hot Module Replacement (HMR) ativado
- Acesso em `http://localhost:5173`

### Build
```bash
npm run build
```
- Compila aplicação para produção
- Otimização de código e bundle
- Output em `dist/`

### Preview
```bash
npm run preview
```
- Visualiza build de produção localmente
- Útil para testes antes do deploy

### Lint
```bash
npm run lint
```
- Verifica e reporta erros ESLint
- Plugins: react, react-hooks, react-refresh
- Falha se warnings existirem

---

## 🔄 Fluxo de Dados

### Exemplo: Criar um Novo Usuário

```
1. Usuário clica em "Novo Usuário" na página /usuarios
2. Modal/Form abre com UsuarioForm
3. Preenchimento e submissão do formulário
4. Validação Zod ocorre
5. ApiService.createUsuario(data) é chamado
6. Request interceptador adiciona token JWT
7. POST /usuarios é enviado ao backend
8. Response retorna novo usuário
9. React Toastify mostra sucesso/erro
10. Página de usuários é atualizada
```

### Exemplo: Autenticação

```
1. Token armazenado no localStorage após login
2. AuthProvider recupera token na inicialização
3. useAuth() fornece user e funções
4. Layout verifica autenticação e renderiza UI
5. Em caso de erro 401, token é removido e usuário é redirecionado
```

---

## 📦 Variáveis de Ambiente

### Desenvolvimento
Crie um arquivo `.env.local`:

```env
VITE_API_URL=http://localhost:3000
```

### Produção
A aplicação usa URL padrão: `https://biblioteca-gateway.onrender.com`

---

## 🌍 Roteamento

Rotas configuradas em `App.jsx` com React Router v6:

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Dashboard | Página inicial |
| `/usuarios` | Usuários | Gerenciamento de usuários |
| `/livros` | Livros | Gerenciamento de livros |
| `/emprestimos` | Empréstimos | Gerenciamento de empréstimos |
| `/reservas` | Reservas | Gerenciamento de reservas |
| `/multas` | Multas | Gerenciamento de multas |
| `*` | Dashboard | Redirect para home |

---

## 🐳 Docker

A aplicação pode ser containerizada com Docker:

```bash
# Build
docker build -t bibton-frontend .

# Run
docker run -p 80:80 bibton-frontend
```

---

## 📋 Checklist de Funcionalidades

### Implementado ✅
- [x] Roteamento multi-página
- [x] Contextos de autenticação e tema
- [x] Cliente HTTP com interceptadores
- [x] Formulários com validação
- [x] UI responsiva com Tailwind
- [x] Tema claro/escuro
- [x] Notificações toast
- [x] Sidebar/Navbar com navegação
- [x] Gerador de PDF (utilitário disponível)

### Potencial para Melhorias 🔄
- [ ] Autenticação real com backend
- [ ] Paginação em listas
- [ ] Busca e filtros avançados
- [ ] Testes unitários (Jest, React Testing Library)
- [ ] Testes E2E (Cypress, Playwright)
- [ ] Lazy loading de componentes
- [ ] Cache de dados (React Query, SWR)
- [ ] Progressive Web App (PWA)

---

## 🔐 Segurança

### Implementações Atuais
- ✅ Token JWT no localStorage
- ✅ Interceptador de requisição com autenticação
- ✅ Tratamento de erro 401
- ✅ Validação de formulários

### Recomendações de Melhoria
- 🔄 Usar httpOnly cookies ao invés de localStorage
- 🔄 Implementar refresh token
- 🔄 CSRF protection
- 🔄 Validação CORS no backend

---

## 📝 Convenções de Código

### Componentes
- Componentes funcionais com Hooks
- PascalCase para nomes de componentes
- Um componente por arquivo

### Variáveis & Funções
- camelCase para variáveis e funções
- Nomes descritivos e significativos
- Prefixo `handle` para event handlers

### Imports
- Imports de biblioteca antes de imports locais
- Imports locais organizados por tipo

### Formatting
- ESLint com regras strict
- Prettier (via ESLint)
- Tailwind classes em ordem

---

## 🤝 Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
2. Commit suas mudanças: `git commit -m 'Adiciona minha feature'`
3. Push para a branch: `git push origin feature/minha-feature`
4. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique issues existentes
2. Verifique a documentação do projeto
3. Crie uma nova issue com detalhes

---

## 📄 Licença

Este projeto é propriedade de Bibton Sistema de Bibliotecas.

---

## 🙏 Acknowledgments

- React community
- Vite team
- Tailwind CSS
- All contributors

---

**Última atualização:** Março 2026  
**Versão:** 1.0.0  
**Status:** ✅ Em Desenvolvimento Ativo
