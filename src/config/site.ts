export const SITE_NAME = 'Международная Ассамблея АА'

export const SITE_NAME_FULL =
  'Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков'

/**
 * Used when no frontend URL is configured in the deployment environment.
 * Canonical URLs, the sitemap and Open Graph tags all derive from this, so it
 * has to be the real public origin.
 */
const DEFAULT_PRODUCTION_URL = 'https://ma-aa.org'

function normalizeOrigin(value: string): string {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`
  return withProtocol.replace(/\/+$/, '')
}

function resolveSiteUrl(): string {
  const configured =
    process.env.PRODUCTION_FRONTEND_URL ||
    process.env.NEXT_PUBLIC_PRODUCTION_FRONTEND_URL ||
    process.env.NEXT_PUBLIC_WEBSITE_URL

  if (configured) return normalizeOrigin(configured)
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:3000'

  return DEFAULT_PRODUCTION_URL
}

export const SITE_URL = resolveSiteUrl()

export const OG_IMAGE = {
  url: '/images/logo.jpg',
  width: 640,
  height: 640,
  alt: SITE_NAME_FULL,
}
