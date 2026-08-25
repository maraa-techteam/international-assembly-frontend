/**
 * Routes that are live in the initial launch scope.
 *
 * The remaining sections (literature, news, services) are removed from this
 * branch until their content is ready. CMS-driven link lists are filtered
 * against this list so that editors cannot surface a link to a page that does
 * not exist yet.
 *
 * Only static routes belong here. Group detail pages live under /groups/<slug>
 * and are covered by the /groups entry.
 */
export const LAUNCH_ROUTES = [
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
] as const

export function isLaunchRoute(href: string): boolean {
  if (!href.startsWith('/')) return true // external links are left alone
  const path = href.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  return (LAUNCH_ROUTES as readonly string[]).includes(path)
}
