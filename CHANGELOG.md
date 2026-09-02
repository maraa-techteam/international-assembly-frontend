# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-09-02

First public release of the site at [ma-aa.org](https://ma-aa.org). Covers all
work since project initialization; no versions were tagged in between.

### Added

- **Groups directory** — searchable listing with filters, pagination, per-group
  detail pages, meeting schedules and image galleries.
- **News and events** — article listing and detail pages sourced from the CMS.
- **Site-wide search** across groups, articles and services.
- **Contacts page** with a contact form delivering through Resend.
- **Services** feature with detail pages and a service-application form.
- **Literature** section with per-category listing and detail pages.
- **`/is-aa-for-me` quiz** — self-assessment for visitors.
- **Contributions** and **useful links** pages.
- Static informational pages: about AA, about the Assembly, for professionals,
  how to start, FAQ, 12 Steps and 12 Traditions, about groups.
- **SEO** — per-route metadata with CMS override, JSON-LD graph (organisation,
  website, articles, breadcrumbs, FAQs, group events), native sitemap and
  robots routes, with tests that fail on a missing or duplicate entry.
- **GDPR consent** — privacy notice page, consent checkbox enforced server-side
  on both form endpoints, and the notice version stamped into every submission.
- **React Email** templates for form submissions.
- Navigation: header with desktop and mobile menus, footer navigation, top
  loading bar, and a search bar with clear button.
- Shared UI: accordion, buttons, checkbox, select, pagination, grid, sections,
  typography, loaders, rich-text preview.
- Automatic icon injection for social, phone and website links in rich text.
- Unit and integration test suites, plus Playwright E2E API tests.
- Tooling: ESLint, Prettier, Husky, commitlint, lint-staged and the CI pipeline.

### Changed

- Restructured to a feature-based architecture (`src/features/<domain>` with
  its own `api`, `components`, `pages` and `types`), and later flattened the
  folder layout further.
- Site-wide ISR at 60 seconds, so CMS edits go live without a redeploy.
- CMS page fetching moved to singletons and consolidated fetchers.
- Removed barrel files in favour of direct imports.
- Reduced the site to its initial launch scope, holding `/literature` and
  `/services` back from the sitemap while they render placeholders.
- Hardcoded social links in the footer.
- Upgraded to Next.js 16 and standardised on pnpm.
- Performance: enabled caching, debounced scroll-driven state, and cut
  unnecessary re-renders and icon overhead.
- Accessibility: aria labels, keyboard dismissal for menus and overlays.

### Fixed

- Made the site indexable and corrected canonical URLs.
- Corrected literature paths in search results to include the category segment.
- Group filter reset behaviour and select-input focus.
- Search result card rendering.
- Numerous layout, styling and responsive fixes across the site.

## [0.1.0] - 2025-10-02

### Added

- Project initialization: added eslint, prettier, tests, commithooks - commitlint and lint-staged, CI set up,

[unreleased]: https://github.com/maraa-techteam/international-assembly-frontend/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/maraa-techteam/international-assembly-frontend/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/maraa-techteam/international-assembly-frontend/releases/tag/v0.1.0
