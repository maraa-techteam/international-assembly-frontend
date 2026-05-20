# International Assembly Frontend

Frontend web application for the **International Assembly of Russian-Speaking Alcoholics Anonymous** (Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков).

The site provides information about AA groups, literature, news, services, and connects Russian-speaking AA members worldwide.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Code Style & Linting](#code-style--linting)
- [Git Workflow](#git-workflow)
- [CI/CD](#cicd)
- [Contributing](#contributing)
- [Changelog](#changelog)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| CMS / API | [Directus](https://directus.io/) via `@directus/sdk` |
| Email | [Resend](https://resend.com/) |
| Unit tests | [Jest 30](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) |
| E2E tests | [Playwright](https://playwright.dev/) |
| Package manager | [pnpm 10](https://pnpm.io/) |
| Linting | [ESLint 9](https://eslint.org/) |
| Formatting | [Prettier 3](https://prettier.io/) |
| Commit hooks | [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) |
| Commit linting | [commitlint](https://commitlint.js.org/) (conventional commits) |
| Sitemap | [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) |

---

## Prerequisites

- **Node.js** `22.9.0` (see [`.nvmrc`](.nvmrc); use `nvm use` to switch automatically)
- **pnpm** `10.7.0` — enabled via Corepack: `corepack enable`

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd international-assembly-frontend
   ```

2. **Enable the correct Node.js version**

   ```bash
   nvm use
   ```

3. **Enable Corepack** (to use the pinned pnpm version)

   ```bash
   corepack enable
   ```

4. **Install dependencies**

   ```bash
   pnpm install
   ```

5. **Set up environment variables** — see [Environment Variables](#environment-variables)

6. **Start the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

| Variable | Required | Description |
|---|---|---|
| `DIRECTUS_CMS_URL` | ✅ | Hostname (without `https://`) of the Directus CMS instance used for server-side data fetching |
| `NEXT_PUBLIC_DIRECTUS_CMS_URL` | ✅ | Same hostname exposed to the browser (client-side). Can mirror `DIRECTUS_CMS_URL` |
| `RESEND_API_KEY` | ✅ | API key for the [Resend](https://resend.com/) email service |
| `PRODUCTION_FRONTEND_URL` | ⬜ | Full URL of the production site (e.g. `https://example.com`). Used for sitemap generation and canonical URLs. Defaults to `https://example.com` / `http://localhost:3000` |

Example `.env.local`:

```dotenv
DIRECTUS_CMS_URL=cms.example.com
NEXT_PUBLIC_DIRECTUS_CMS_URL=cms.example.com
RESEND_API_KEY=re_xxxxxxxxxxxx
PRODUCTION_FRONTEND_URL=https://example.com
```

> **Note:** Never commit secrets to version control. The `.env.local` file is already listed in `.gitignore`.

---

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages & route handlers
│   │   ├── layout.tsx          # Root layout (fonts, header, footer)
│   │   ├── page.tsx            # Home page
│   │   ├── groups/[slug]/      # Dynamic group detail pages (ISR, revalidate=60)
│   │   ├── literature/[slug]/  # Dynamic literature detail pages
│   │   ├── news-and-events/    # News & events section
│   │   ├── services/[slug]/    # Dynamic service detail pages
│   │   ├── api/                # Next.js API routes
│   │   └── ...                 # Other static and content pages
│   ├── features/               # Feature-based modules
│   │   ├── articles/           # News/article cards and list pages
│   │   ├── groups/             # Group search and filter UI
│   │   ├── literature/         # Literature pages
│   │   ├── quiz/               # Is AA for me? quiz
│   │   ├── search/             # Site search
│   │   └── services/           # Services pages
│   ├── common/                 # Shared code
│   │   ├── api/                # Data fetching functions (Directus)
│   │   ├── components/         # Shared UI components
│   │   ├── hooks/              # Shared React hooks
│   │   ├── layouts/            # Layout components (Header, Footer, Section, Grid…)
│   │   ├── lib/                # Library clients (Directus SDK setup)
│   │   ├── types/              # Shared TypeScript types
│   │   └── utils/              # Utility functions
│   ├── ui/                     # Base UI primitives (design system tokens)
│   └── styles/                 # Global CSS
├── tests/
│   └── e2e/
│       └── api/                # Playwright API end-to-end tests
├── public/                     # Static assets & generated sitemap
├── .github/
│   └── workflows/
│       └── github-actions.yml  # CI/CD pipeline
└── ...                         # Config files
```

### Key architectural notes

- **App Router + ISR**: Dynamic `[slug]` pages use `revalidate = 60` seconds and `generateStaticParams()` to pre-render known slugs at build time.
- **Feature modules**: Each feature folder owns its own pages, API calls, and components.
- **Directus CMS**: All content is fetched from a headless Directus instance using the official SDK.

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the development server with Turbopack |
| `pnpm build` | Build the app for production (runs `next-sitemap` afterwards) |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint and auto-fix issues |
| `pnpm format` | Check code formatting with Prettier |
| `pnpm format:fix` | Auto-format all files with Prettier |
| `pnpm test:unit` | Run unit tests with Jest |
| `pnpm test:unit:watch` | Run unit tests in watch mode |
| `pnpm test:unit:coverage` | Run unit tests and generate a coverage report |
| `pnpm test:e2e` | Run all Playwright end-to-end tests |
| `pnpm test:e2e:api` | Run Playwright API tests only |
| `pnpm test:e2e:ui` | Open the Playwright UI runner |

---

## Testing

### Unit & integration tests (Jest)

Tests live alongside source files or in dedicated `__tests__` directories. Run them with:

```bash
pnpm test:unit
```

Coverage report:

```bash
pnpm test:unit:coverage
```

### End-to-end tests (Playwright)

E2E API tests are located in `tests/e2e/api/`. They verify integration with the Directus CMS API.

```bash
# Run all E2E tests
pnpm test:e2e

# Run API tests only
pnpm test:e2e:api
```

> The `DIRECTUS_CMS_URL` environment variable must be set for E2E tests to reach the backend.

---

## Code Style & Linting

The project enforces consistent code style automatically:

- **Prettier** — formatting (single quotes, no semi-colons, sorted imports via `@trivago/prettier-plugin-sort-imports`, Tailwind class sorting via `prettier-plugin-tailwindcss`)
- **ESLint** — code quality rules (Next.js recommended config + Prettier integration)

Check and fix everything at once:

```bash
pnpm format:fix && pnpm lint:fix
```

---

## Git Workflow

### Commit message convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification, enforced by `commitlint` on every commit.

Format: `<type>(<optional scope>): <description>`

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`

Examples:

```
feat(groups): add country filter to group search
fix(api): handle missing CMS response gracefully
docs: update README with environment variable instructions
```

### Pre-commit hooks

[Husky](https://typicode.github.io/husky/) runs the following checks on every commit via `lint-staged`:

- `prettier --write` + `eslint --fix` + `eslint` on all staged `.js/.jsx/.ts/.tsx` files
- `prettier --write` on staged `.json`, `.css`, and `.md` files

---

## CI/CD

The GitHub Actions pipeline (`.github/workflows/github-actions.yml`) runs on every pull request and consists of four sequential jobs:

| Job | Depends on | What it does |
|---|---|---|
| **Lint** | — | Checks formatting (Prettier) and linting (ESLint) |
| **Build** | Lint | Verifies the project builds successfully |
| **Test** | Build | Runs unit and integration tests (Jest) |
| **E2E API Tests** | Build | Runs Playwright API end-to-end tests |

Required secrets in the repository settings:

| Secret | Used by |
|---|---|
| `DIRECTUS_CMS_URL` | Build, Test, E2E jobs |
| `RESEND_API_KEY` | Build job |

---

## Contributing

1. Fork the repository and create a feature branch from `main`.
2. Follow the [Code Style](#code-style--linting) guidelines — the pre-commit hooks will help.
3. Write or update tests to cover your changes.
4. Open a pull request — the CI pipeline must pass before merging.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of notable changes.
