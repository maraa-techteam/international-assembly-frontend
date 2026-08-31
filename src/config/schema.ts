import { htmlToPlainText } from '@/common/utils/toMetaDescription'

import {
  OG_IMAGE,
  REGISTRATION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_NAME_FULL,
  SITE_URL,
  SOCIAL_PROFILES,
  TELEGRAM_HELP_URL,
} from './site'

/**
 * Stable node ids. Every graph on the site points at these instead of repeating
 * the organisation, so a consumer reading two pages resolves one entity rather
 * than two look-alikes.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

type JsonLdNode = Record<string, unknown>

const absolute = (path: string) => new URL(path, SITE_URL).toString()

/** Drops keys whose value is undefined or an empty array, one level deep. */
function compact(node: JsonLdNode): JsonLdNode {
  return Object.fromEntries(
    Object.entries(node).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        !(Array.isArray(value) && value.length === 0),
    ),
  )
}

/**
 * The organisation itself.
 *
 * Typed `NGO` — the non-profit subtype of Organization. `nonprofitStatus` stays
 * absent even though the organisation is registered: that property enumerates
 * US, Dutch and UK legal forms only, so a Latvian registration has no valid
 * value there. The registry number is a stronger signal anyway, and belongs in
 * `identifier`, where it can actually be checked against the register.
 */
export function organizationSchema(): JsonLdNode {
  return compact({
    '@type': 'NGO',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME_FULL,
    alternateName: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: absolute(OG_IMAGE.url),
    image: absolute(OG_IMAGE.url),
    knowsLanguage: 'ru',
    identifier: {
      '@type': 'PropertyValue',
      propertyID: REGISTRATION.registry,
      value: REGISTRATION.number,
    },
    sameAs: SOCIAL_PROFILES,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: TELEGRAM_HELP_URL,
      availableLanguage: { '@type': 'Language', name: 'Russian' },
    },
  })
}

/**
 * The site itself, with its internal search declared as a `SearchAction`.
 *
 * `query-input` names the placeholder in `urlTemplate`, which is what lets a
 * consumer build a real query URL rather than just knowing that search exists.
 * The parameter is `search`, matching what `SearchBar` pushes and what
 * `/search` reads — if one of those is ever renamed, this has to move with it.
 *
 * Google dropped the sitelinks search box rich result in 2024, so this serves
 * other structured-data consumers rather than the site's own SERP appearance.
 */
export function webSiteSchema(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME_FULL,
    alternateName: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'ru',
    publisher: { '@id': ORGANIZATION_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/** The site-wide graph, emitted once from the root layout. */
export function siteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), webSiteSchema()],
  }
}

const DAY_OF_WEEK: Record<string, string> = {
  Понедельник: 'https://schema.org/Monday',
  Вторник: 'https://schema.org/Tuesday',
  Среда: 'https://schema.org/Wednesday',
  Четверг: 'https://schema.org/Thursday',
  Пятница: 'https://schema.org/Friday',
  Суббота: 'https://schema.org/Saturday',
  Воскресенье: 'https://schema.org/Sunday',
}

const ATTENDANCE_MODE: Record<string, string> = {
  Офлайн: 'https://schema.org/OfflineEventAttendanceMode',
  Онлайн: 'https://schema.org/OnlineEventAttendanceMode',
  Гибрид: 'https://schema.org/MixedEventAttendanceMode',
}

type ScheduleSlot = { day?: string | null; time?: string | null }

export type GroupSchemaInput = {
  name?: string | null
  description?: string | null
  country?: string | null
  presence?: string | null
  address?: string | null
  digital_address?: string | null
  website?: string | null
  telegram?: string | null
  schedule_slots?: ScheduleSlot[] | null
  time_zone?: string | null
}

/**
 * A meeting's weekly slots as `Schedule` nodes.
 *
 * The CMS stores time as `HH:MM:SS`; schema.org wants `HH:MM`. A slot whose day
 * is not one of the seven names is dropped rather than published with a missing
 * `byDay`, which would describe a meeting that repeats on no particular day.
 *
 * `scheduleTimezone` carries the CMS time-zone label unprocessed — a region and
 * city list with an offset range, e.g. `Европа/Афины, Бухарест, Хельсинки
 * (UTC+2/+3)`. Schema.org asks for an IANA name such as `Europe/Helsinki` here,
 * so a consumer parsing the field strictly will reject it. The label ships as
 * stored because it is what the page itself displays.
 */
function scheduleNodes(slots: ScheduleSlot[], timeZone?: string): JsonLdNode[] {
  return slots
    .filter((slot) => slot.day && DAY_OF_WEEK[slot.day])
    .map((slot) =>
      compact({
        '@type': 'Schedule',
        byDay: DAY_OF_WEEK[slot.day as string],
        startTime: slot.time?.slice(0, 5),
        scheduleTimezone: timeZone,
        repeatFrequency: 'P1W',
      }),
    )
}

function locationNodes(group: GroupSchemaInput): JsonLdNode[] {
  const nodes: JsonLdNode[] = []
  const isOnline = group.presence === 'Онлайн' || group.presence === 'Гибрид'
  const isPhysical = group.presence === 'Офлайн' || group.presence === 'Гибрид'
  const mapUrl = group.digital_address?.trim()
  const hasMapUrl = !!mapUrl && /^https?:\/\//.test(mapUrl)

  if (isPhysical && group.address) {
    nodes.push(
      compact({
        '@type': 'Place',
        name: group.name ?? undefined,
        address: group.address,
        hasMap: hasMapUrl ? mapUrl : undefined,
      }),
    )
  }

  if (isOnline) {
    // An online group's joining link lives in whichever field the editors
    // filled: the digital address, else the group's own site or Telegram.
    const url =
      (hasMapUrl ? mapUrl : undefined) ??
      group.website?.trim() ??
      group.telegram?.trim()

    if (url) nodes.push({ '@type': 'VirtualLocation', url })
  }

  return nodes
}

/**
 * A group's recurring meeting as an `Event`.
 *
 * No `organizer` is asserted. Under Tradition 4 each group is autonomous, so
 * naming the Assembly as the organiser of a group's meeting would be false; the
 * Assembly is a service body, not the convener.
 *
 * The markup carries `eventSchedule` and no `startDate`, because a weekly
 * meeting has no single start. That is the accurate description of a repeating
 * event, but note Google's Event rich results generally want `startDate`, so
 * expect this to serve machine-readable consumers rather than SERP features.
 */
export function groupEventSchema(
  group: GroupSchemaInput,
  path: string,
): JsonLdNode {
  const locations = locationNodes(group)
  const schedules = scheduleNodes(
    group.schedule_slots ?? [],
    group.time_zone ?? undefined,
  )

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: group.name ?? undefined,
    url: absolute(path),
    description: htmlToPlainText(group.description),
    inLanguage: 'ru',
    isAccessibleForFree: true,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: group.presence
      ? ATTENDANCE_MODE[group.presence]
      : undefined,
    location: locations.length === 1 ? locations[0] : locations,
    eventSchedule: schedules.length === 1 ? schedules[0] : schedules,
    about: { '@id': ORGANIZATION_ID },
  })
}

export type ArticleSchemaInput = {
  title?: string | null
  perex?: string | null
  date_created?: string | null
  date_updated?: string | null
}

export function articleSchema(
  article: ArticleSchemaInput,
  path: string,
  imageUrl?: string,
): JsonLdNode {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title ?? undefined,
    description: article.perex?.trim() || undefined,
    datePublished: article.date_created ?? undefined,
    dateModified: article.date_updated ?? article.date_created ?? undefined,
    image: imageUrl,
    inLanguage: 'ru',
    mainEntityOfPage: absolute(path),
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
  })
}

/**
 * The FAQ as `FAQPage`.
 *
 * Worth knowing: since 2023 Google shows FAQ rich results only for government
 * and health sites, so this will not change how the page looks in search. It
 * stays because it makes the answers machine-readable for everything else that
 * reads structured data.
 */
export function faqSchema(
  entries: { title?: string | null; text?: string | null }[],
): JsonLdNode | undefined {
  const questions = entries
    .filter((entry) => entry.title && entry.text)
    .map((entry) => ({
      '@type': 'Question',
      name: entry.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: htmlToPlainText(entry.text),
      },
    }))

  if (questions.length === 0) return undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions,
  }
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  }
}
