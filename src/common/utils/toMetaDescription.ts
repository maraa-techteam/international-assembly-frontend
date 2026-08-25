const MAX_LENGTH = 160

const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&laquo;': '«',
  '&raquo;': '»',
  '&ldquo;': '“',
  '&rdquo;': '”',
  '&mdash;': '—',
  '&ndash;': '–',
  '&hellip;': '…',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
}

/**
 * Turns a rich-text field from the CMS into a plain-text meta description.
 *
 * Several collections store their body as HTML, and feeding that straight into
 * a `<meta name="description">` leaks tags and entities into search results.
 * Block-level tags become spaces so words either side of a `<br>` do not run
 * together, and the result is trimmed to a length search engines will show.
 */
export function toMetaDescription(
  html?: string | null,
  maxLength: number = MAX_LENGTH,
): string | undefined {
  if (!html) return undefined

  let text = html.replace(/<[^>]*>/g, ' ')

  // `&amp;` is decoded last so an encoded entity like `&amp;laquo;` survives as
  // literal text instead of turning into `«`.
  for (const [entity, char] of Object.entries(ENTITIES)) {
    if (entity === '&amp;') continue
    text = text.split(entity).join(char)
  }
  text = text.split('&amp;').join('&')

  text = text.replace(/\s+/g, ' ').trim()

  if (!text) return undefined
  if (text.length <= maxLength) return text

  const clipped = text.slice(0, maxLength)
  const lastSpace = clipped.lastIndexOf(' ')

  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).replace(/[,;:.\s]+$/, '')}…`
}
