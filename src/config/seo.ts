import type { Metadata } from 'next'

import { OG_IMAGE, SITE_NAME, SITE_NAME_FULL, SITE_URL } from './site'

type PageMetadataInput = {
  /** Title from the CMS. Falls back to `fallbackTitle` when empty. */
  title?: string | null
  description?: string | null
  /** Root-relative path of the page, e.g. `/about-aa`. */
  path: string
  fallbackTitle: string
  fallbackDescription?: string
}

/**
 * Builds the metadata for a page: title, description, canonical URL and the
 * Open Graph / Twitter tags.
 *
 * Next.js does not deep-merge `openGraph` from the root layout into a page, so
 * every page that defines its own metadata has to emit the full object. Going
 * through this helper keeps the tags consistent and stops a page from silently
 * shipping without social tags or with an `undefined` title when the CMS
 * returns an empty record.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  fallbackTitle,
  fallbackDescription,
}: PageMetadataInput): Metadata {
  const pageTitle = title?.trim() || fallbackTitle
  const fullTitle = `${pageTitle} | ${SITE_NAME}`
  const pageDescription = description?.trim() || fallbackDescription
  const url = new URL(path, SITE_URL).toString()

  return {
    title: fullTitle,
    description: pageDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      siteName: SITE_NAME_FULL,
      title: fullTitle,
      description: pageDescription,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary',
      title: fullTitle,
      description: pageDescription,
      images: [OG_IMAGE.url],
    },
  }
}
