/**
 * Every static route the site publishes.
 *
 * This is the sitemap's static half and the list `PAGE_SEO` is checked against,
 * so a page added without default search copy fails the SEO test rather than
 * shipping untitled.
 *
 * Only static routes belong here. Detail pages live under a section's own
 * prefix — /groups/<slug>, /literature/<category>/<slug> — and reach the
 * sitemap through `detailRoutes` instead.
 *
 * `/search` is deliberately absent: it renders query-string results and has no
 * standalone content to index.
 */
export const STATIC_ROUTES = [
  '/',
  '/about-aa',
  '/about-international-assembly',
  '/to-professionals',
  '/start-the-journey',
  '/faq',
  '/is-aa-for-me',
  '/12-steps-12-traditions',
  '/contacts',
  '/useful-links',
  '/contributions',
  '/groups',
  '/about-groups',
  '/news-and-events',
  '/literature',
  '/services',
] as const

/**
 * Section prefixes held back from the sitemap.
 *
 * `/literature` and `/services` render a work-in-progress placeholder, and
 * their detail pages, while still live and reachable by URL, hang off a
 * section a visitor cannot browse to. Listing either in the sitemap would
 * invite crawlers to index a placeholder and a set of orphaned pages.
 *
 * A prefix covers the section page and everything under it. The routes stay in
 * `STATIC_ROUTES` because they do exist and do carry metadata — this withholds
 * them from the sitemap only. Empty this list to publish the sections.
 */
export const SITEMAP_EXCLUDED_PREFIXES = ['/literature', '/services'] as const
