import { LAUNCH_ROUTES } from '@/config/launchRoutes'
import { SITE_URL } from '@/config/site'
import { fetchArticles } from '@/features/articles/api/fetchArticles'
import { fetchGroups } from '@/features/groups/api/fetchGroups'
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
 * A CMS failure degrades to the static routes instead of failing the build: an
 * incomplete sitemap loses some crawl coverage, a missing one loses all of it.
 */
async function detailRoutes(): Promise<MetadataRoute.Sitemap> {
  const [groups, articles] = await Promise.all([
    fetchGroups({ limit: '-1' })
      .then((result) => result.data)
      .catch(() => []),
    fetchArticles().catch(() => []),
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

  return [...groupEntries, ...articleEntries]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticRoutes = LAUNCH_ROUTES.map((path) => ({
    url: url(path),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }))

  return [...staticRoutes, ...(await detailRoutes())]
}
