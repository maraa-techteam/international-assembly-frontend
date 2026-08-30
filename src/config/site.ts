export const SITE_NAME = 'Международная Ассамблея АА'

export const SITE_NAME_FULL =
  'Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков'

/**
 * Shared by the root metadata and the Organization JSON-LD so the description
 * search engines read and the one machine-readable consumers read cannot drift.
 */
export const SITE_DESCRIPTION =
  'Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков — самостоятельная структура обслуживания АА. В её состав входят представители отдельных групп АА, региональных комитетов и постоянно действующий комитет (ПКМА). Ассамблея руководствуется 12 Традициями АА и 12 Концепциями обслуживания, координирует деятельность с Офисом по Общему Обслуживанию АА США и Канады, а также сотрудничает без присоединения с заинтересованными организациями и региональными структурами. Заседания Ассамблеи проходят два раза в год.'

/** Anonymous Telegram bot, the fellowship's primary first-contact channel. */
export const TELEGRAM_HELP_URL = 'https://t.me/QSAAbot'

/**
 * Registration in the Latvian Register of Enterprises.
 *
 * This is the organisation's registry entry, not a schema.org category. It goes
 * in `identifier` rather than `nonprofitStatus`, whose enumeration holds only
 * US, Dutch and UK legal forms — no Latvian one exists there to claim.
 *
 * `propertyID` names the registry as plain text rather than a URL: schema.org
 * permits a site-specific string, and a URL that turns out to be wrong is worse
 * than none. Swap in the registry URL or an ISO 6523 code if you have one.
 */
export const REGISTRATION = {
  registry: 'Latvijas Republikas Uzņēmumu reģistrs',
  number: '50008348781',
}

/**
 * Profiles the organisation controls, for the `sameAs` claim in JSON-LD.
 *
 * Hardcoded to match what the footer renders. The CMS `social_media` collection
 * is not wired to anything, and one of its rows still holds `/` as a URL, so
 * reading it here would publish a claim the site itself does not make.
 */
export const SOCIAL_PROFILES = [
  'https://www.youtube.com/@МеждународнаяАссамблея',
  TELEGRAM_HELP_URL,
]

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
