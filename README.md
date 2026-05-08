# Animely Front

Frontend da plataforma Animely — um catálogo social de mangás e animes com feed de conteúdo, perfis customizáveis e comunidade.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Roteamento | React Router v6 |
| Estado do servidor | TanStack Query v5 |
| UI | shadcn/ui (Radix UI), Tailwind CSS 3 |
| Animações | Framer Motion |
| i18n | i18next + react-i18next (pt, en, es) |
| Testes | Vitest + Testing Library (jsdom) |
| Lint | ESLint 9 |

## Pré-requisitos

- Node.js >= 18
- npm ou bun

## Setup local

```bash
cd animely-web
npm install
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e configure:

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `VITE_API_BASE_URL` | Sim | URL base da API backend |

Exemplo:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Build e Run

```bash
npm run dev          # Dev server com HMR (porta 8080)
npm run build        # Build de produção
npm run build:dev    # Build com variáveis de desenvolvimento
npm run preview      # Preview do build de produção
npm run lint         # Lint
npm run test         # Testes unitários (Vitest)
npm run test:watch   # Testes em modo watch
```

O dev server faz proxy de `/api` para `http://localhost:3000` (configurável em `vite.config.ts`).

## Estrutura de diretórios

```
src/
├── api/            # Camada de acesso a dados externos (client, endpoints, DTOs, adapters)
├── components/
│   ├── ui/         # Primitivos shadcn/ui (Radix UI)
│   └── site/       # Componentes de domínio da aplicação
├── features/       # Lógica de negócio (ex.: filtros de catálogo)
├── hooks/          # Custom hooks (useHomePage, useIsMobile, etc.)
├── i18n/           # Configuração i18next + locales (en, pt, es)
├── lib/            # Utilitários (cn, dados mock)
├── pages/          # Páginas mapeadas às rotas
├── shared/         # Tipos e enums compartilhados
└── test/           # Setup de testes (jest-dom matchers)
```

## Rotas

| Path | Página | Descrição |
|------|--------|-----------|
| `/` | Index | Home com hero carousel e seções de mangás |
| `/intro` | Index | Alias da home |
| `/catalog` | Catalog | Catálogo filtrado com infinite scroll |
| `/profile` | Profile | Perfil do usuário logado |
| `/explore` | Explore | Feed de conteúdo + comunidade |
| `/feed` | Feed | Feed estilo TikTok com scroll snap |
| `/posts` | Posts | Listagem de posts |
| `/posts/:slug` | PostDetail | Detalhe de post |
| `/login` | Login | Autenticação (pendente) |
| `/changelog` | Changelog | Histórico de versões |
| `/donate` | Donate | Página de doação |

## Fluxo de dados

```
Backend (localhost:3000)
  └─► src/api/client.ts        (fetch wrapper)
       └─► src/api/home.ts      (endpoints por domínio)
            └─► src/api/adapters (DTO → modelo UI)
                 └─► src/hooks  (React Query: cache, staleTime)
                      └─► src/pages (consumo, composição)
                           └─► src/components/site (renderização)
```

## Hierarquia de estado

| Escopo | Mecanismo | Exemplos |
|--------|-----------|----------|
| Servidor | React Query | Dados da home, mangás |
| Global UI | useSyncExternalStore + localStorage | Estado do painel direito |
| URL | useSearchParams | Tipo de mídia no catálogo |
| Página | useState / useReducer | Filtros, tabs, modais |
| Componente | useState local | Like, bookmark, spoiler |

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [Workflow Playbook](docs/WORKFLOW_PLAYBOOK.md) | Pipeline completo: PR → produção, papéis, gates, rollback |
| [Git Flow](docs/GIT_FLOW.md) | Modelo de branches, regras de versionamento, hooks |

## Links

- [Animely Back](/TSUAA/projects/animely-back) — API REST
- Repositório: [github.com/Boyce22/animely-web](https://github.com/Boyce22/animely-web)
- Deploy (GitHub Pages): [boyce22.github.io/animely-web](https://boyce22.github.io/animely-web/)
