# International Assembly — Web

Frontend for the **International Assembly for General Service of Russian-speaking
Alcoholics Anonymous** (Международная Ассамблея по Общему Обслуживанию
Русскоязычных Анонимных Алкоголиков), published at
[ma-aa.org](https://ma-aa.org).

The site is a Russian-language Next.js application. Informational pages are
written in the code and prerendered at build time, so changing their copy takes
a deploy. Groups, articles, literature and services are authored in a
[Directus](https://directus.io) CMS and rendered on every request, so editors
publish those without one. Visitors can find a meeting, browse news and
literature, take the self-assessment quiz, and reach the fellowship through the
contact and service-application forms.

## Tech stack

| Area            | Choice                                                |
| --------------- | ----------------------------------------------------- |
| Framework       | Next.js 16 (App Router, Turbopack)                    |
| UI              | React 19, Tailwind CSS v4, `class-variance-authority` |
| Language        | TypeScript (`strict`)                                 |
| CMS             | Directus, via `@directus/sdk`                         |
| Email           | Resend + React Email                                  |
| Forms           | `react-hook-form`                                     |
| Unit tests      | Jest + Testing Library                                |
| E2E tests       | Playwright                                            |
| Package manager | pnpm 10.7                                             |

## Prerequisites

- **Node.js 22.9.0** — the version in `.nvmrc`; run `nvm use` to match it.
- **pnpm** — pinned via `packageManager`, so `corepack enable` is enough.

## Getting started

```bash
nvm use
corepack enable
pnpm install
```

Create a `.env` in the project root (see [Environment variables](#environment-variables)),
then start the dev server:

```bash
pnpm dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

`DIRECTUS_CMS_URL` is required even though the build fetches nothing from the
CMS: `src/common/lib/directus.ts` throws when a list route's module loads without
it, and `next build` loads every route.

## Environment variables

| Variable                              | Required       | Purpose                                                                                                                                                     |
| ------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DIRECTUS_CMS_URL`                    | yes            | CMS **hostname only**, no scheme — `https://` is prepended in `src/common/lib/directus.ts`. Also used as the allowed remote image host in `next.config.ts`. |
| `NEXT_PUBLIC_DIRECTUS_CMS_URL`        | —              | Client-side fallback for the same hostname.                                                                                                                 |
| `RESEND_API_KEY`                      | yes, for forms | Authenticates the contact and service-application endpoints with Resend.                                                                                    |
| `RESEND_FROM_EMAIL`                   | yes, for forms | Sender address on outgoing form mail.                                                                                                                       |
| `PRODUCTION_FRONTEND_URL`             | —              | Public origin. Feeds canonical URLs, the sitemap and Open Graph tags.                                                                                       |
| `NEXT_PUBLIC_PRODUCTION_FRONTEND_URL` | —              | Fallback for the above.                                                                                                                                     |
| `NEXT_PUBLIC_WEBSITE_URL`             | —              | Last fallback for the above.                                                                                                                                |

`SITE_URL` resolves from the first of those three that is set, accepts a value
with or without a scheme, and falls back to `http://localhost:3000` outside
production and to `https://ma-aa.org` in it — see `resolveSiteUrl` in
`src/config/site.ts`.

## Scripts

| Command                           | What it does                                              |
| --------------------------------- | --------------------------------------------------------- |
| `pnpm dev`                        | Dev server with Turbopack                                 |
| `pnpm build`                      | Production build                                          |
| `pnpm start`                      | Serve the production build                                |
| `pnpm lint` / `pnpm lint:fix`     | ESLint                                                    |
| `pnpm format` / `pnpm format:fix` | Prettier check / write                                    |
| `pnpm test:unit`                  | Jest, once                                                |
| `pnpm test:unit:watch`            | Jest, watch mode                                          |
| `pnpm test:unit:coverage`         | Jest with coverage                                        |
| `pnpm test:e2e`                   | Full Playwright run                                       |
| `pnpm test:e2e:api`               | Playwright API project only                               |
| `pnpm test:e2e:ui`                | Playwright UI mode                                        |
| `pnpm email`                      | React Email preview server for the templates in `emails/` |

## Project structure

```
src/
  app/          Routes (App Router): one folder per page, plus
                api/, sitemap.ts, robots.ts, layout.tsx, not-found.tsx
  features/     Domain slices — articles, groups, literature, services,
                search, quiz, contacts, privacy — each holding the
                api/, components/, pages/ and types/ it actually needs
  common/       Shared across features:
                components/  design-system pieces (Button, Select, Header…)
                lib/         the Directus client
                hooks/ utils/ types/
  config/       Site constants, SEO copy, JSON-LD, route list
emails/         React Email templates for form submissions
tests/e2e/      Playwright specs
public/         Static images and icons
```

A route that shows CMS data stays thin: it fetches through the feature's own
`api/`, then renders the matching component from `features/<domain>/pages/`. A
content page holds its copy in the route file, or in the feature page for
`/contacts`, `/is-aa-for-me` and `/privacy`. Imports use the `@/*` alias for
`./src/*`.

## Architecture notes

**Rendering.** Every route is one of two kinds, and nothing uses ISR.

- **Static**, prerendered at build with no CMS calls: `/about-aa`,
  `/about-international-assembly`, `/about-groups`, `/to-professionals`,
  `/start-the-journey`, `/faq`, `/is-aa-for-me`, `/12-steps-12-traditions`,
  `/contacts`, `/useful-links`, `/contributions`, `/privacy`, the 404 page and
  `robots.txt`. Their copy, links, images and meta tags are in the code, so
  changing them takes a deploy. One-off copy is written directly in JSX, while a
  component that repeats, such as an FAQ item or a provider card, maps over a typed
  array in the same file. Rich text sits in a `.rte` wrapper, and images live in
  `public/images`.
- **Per request**, marked `force-dynamic`: `/`, `/groups`, `/news-and-events`,
  `/literature`, `/services` (a placeholder for now), their detail pages, `/search`
  and `sitemap.xml`. Only the lists and items come from the CMS, through fetchers
  that set `cache: 'no-store'`, so an edit shows on the next request. The rest of
  these pages is hardcoded too. `news_and_events_page.highlighted_post` is the only
  `*_page` field the site still reads.

If the CMS is down, static pages are unaffected, `/` falls back to empty lists, the
other per-request pages show `src/app/error.tsx`, and the sitemap drops to its
fixed routes.

**SEO and structured data.** `src/config/seo.ts` holds the title and description
of every route with a fixed path, published through `buildPageMetadata`; detail
pages use their CMS item's own. `src/config/schema.ts` builds the JSON-LD graph — organisation, website, articles,
breadcrumbs, FAQs and group events — around stable node ids so consumers
resolve one entity across pages. Both are covered by tests that fail the build
on a missing entry, a duplicate title, or an out-of-range description length,
which means **adding a route to `src/config/routes.ts` without SEO copy breaks
the test suite by design.**

**Sitemap and robots.** Generated natively by `src/app/sitemap.ts` and
`src/app/robots.ts`. Detail pages are enumerated explicitly because paginated
listings hide most of them from crawlers. The sitemap is generated per request, so
new items appear straight away, and a CMS failure degrades to the fixed routes
rather than failing. Sections listed in `SITEMAP_EXCLUDED_PREFIXES` are withheld
while they render a placeholder.

**Forms and consent.** `POST /api/contact` and `POST /api/service-application`
validate input server-side and re-check the GDPR consent flag — the form
checkbox is an affordance, not a control, since the endpoints accept direct
requests. Each submission email is stamped with `PRIVACY_NOTICE_UPDATED_AT` so
the recipient's mailbox holds a record of which wording the sender agreed to. Mail
goes to `CONTACT_RECIPIENT_EMAIL` in `src/config/site.ts`, the secretary's mailbox
the privacy notice describes.

## Testing

**Unit tests** live beside the code they cover, as `*.test.ts(x)` — components,
hooks, utils, and the SEO/schema config. `pnpm test:unit`.

**E2E tests** in `tests/e2e/`. The `api` Playwright project exercises the live
Directus API directly and needs `DIRECTUS_CMS_URL`; browser projects (Chromium,
Firefox, WebKit) are configured but currently have no specs. `playwright.config.ts`
loads `.env` itself, so no extra setup is needed.

## Code quality and commits

Prettier and ESLint run on staged files through Husky and lint-staged.
Commit messages are validated by commitlint against
[Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`,
`refactor:`, and so on.

## CI

`.github/workflows/github-actions.yml` runs on every pull request: lint and
format check → build → unit tests and E2E API tests in parallel. CMS and Resend
credentials come from repository secrets.
