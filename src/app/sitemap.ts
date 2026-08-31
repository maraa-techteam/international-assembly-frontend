import { SITEMAP_EXCLUDED_PREFIXES, STATIC_ROUTES } from '@/config/routes'
import { SITE_URL } from '@/config/site'
import { fetchArticles } from '@/features/articles/api/fetchArticles'
import { fetchGroups } from '@/features/groups/api/fetchGroups'
import { fetchLiteratureItems } from '@/features/literature/api/fetchLiteratureItems'
import { literatureCategorySlugs } from '@/features/literature/utils/literature.utils'
import { fetchServices } from '@/features/services/api/fetchServices'
import type { MetadataRoute } from 'next'

const url = (path: string) => new URL(path, SITE_URL).toString()

/**
 * Detail pages have to be listed explicitly.
 *
 * `/groups` renders one page of results at a time, so all but the first handful
 * of group pages are reachable only through query-param pagination — which
 * crawlers follow poorly, if at all. Without these entries the bulk of the
 * groups, the site's most searchable content, stays effectively undiscoverable.
 *
 * Literature runs into the same wall: `/literature` links only the first four
 * items per category, and the rest sit behind a paginated category page.
 *
 * A CMS failure degrades to the static routes instead of failing the build: an
 * incomplete sitemap loses some crawl coverage, a missing one loses all of it.
 */
async function detailRoutes(): Promise<MetadataRoute.Sitemap> {
  const [groups, articles, literature, services] = await Promise.all([
    fetchGroups({ limit: '-1' })
      .then((result) => result.data)
      .catch(() => []),
    fetchArticles().catch(() => []),
    fetchLiteratureItems().catch(() => []),
    fetchServices().catch(() => []),
  ])

  const groupEntries = groups
    .filter((group) => group.slug)
    .map((group) => ({
      url: url(`/groups/${group.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const articleEntries = articles
    .filter((article) => article.slug)
    .map((article) => ({
      url: url(`/news-and-events/${article.slug}`),
      lastModified: new Date(article.date_updated ?? article.date_created),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))

  const literatureEntries = literature
    .filter((item) => item.slug && literatureCategorySlugs[item.category])
    .map((item) => ({
      url: url(
        `/literature/${literatureCategorySlugs[item.category]}/${item.slug}`,
      ),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))

  const serviceEntries = services
    .filter((service) => service.slug)
    .map((service) => ({
      url: url(`/services/${service.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [
    ...groupEntries,
    ...articleEntries,
    ...literatureEntries,
    ...serviceEntries,
  ]
}

/** True for a section that is live but deliberately unlisted, and its children. */
function isExcluded(path: string): boolean {
  return SITEMAP_EXCLUDED_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  )
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticRoutes = STATIC_ROUTES.filter((path) => !isExcluded(path)).map(
    (path) => ({
      url: url(path),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.8,
    }),
  )

  // Filtered on the built URL rather than at each source, so a newly excluded
  // section drops out of the sitemap by adding one prefix and nothing else.
  const details = (await detailRoutes()).filter(
    (entry) => !isExcluded(new URL(entry.url).pathname),
  )

  return [...staticRoutes, ...details]
}
