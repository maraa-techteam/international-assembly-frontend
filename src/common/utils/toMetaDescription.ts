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
  //eslint-disable-next-line
  '&quot;': '"',
  //eslint-disable-next-line
  '&#39;': "'",
  //eslint-disable-next-line
  '&apos;': "'",
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
  // Latin-1 letters. Group addresses across Europe carry these, and an
  // undecoded `&auml;` in a description reaches search results verbatim.
  '&auml;': 'ä',
  '&Auml;': 'Ä',
  '&ouml;': 'ö',
  '&Ouml;': 'Ö',
  '&uuml;': 'ü',
  '&Uuml;': 'Ü',
  '&szlig;': 'ß',
  '&aring;': 'å',
  '&Aring;': 'Å',
  '&aelig;': 'æ',
  '&oslash;': 'ø',
  '&Oslash;': 'Ø',
  '&eacute;': 'é',
  '&egrave;': 'è',
  '&ecirc;': 'ê',
  '&agrave;': 'à',
  '&acirc;': 'â',
  '&ccedil;': 'ç',
  '&iacute;': 'í',
  '&oacute;': 'ó',
  '&uacute;': 'ú',
  '&ntilde;': 'ñ',
  '&atilde;': 'ã',
  '&otilde;': 'õ',
  '&middot;': '·',
  '&bull;': '•',
  '&deg;': '°',
  '&euro;': '€',
  '&rsquo;': '’',
  '&lsquo;': '‘',
}

/** `&#233;` / `&#xE9;`, which editors' paste-ins produce as often as names. */
function decodeNumericEntities(text: string): string {
  return text.replace(/&#(x[0-9a-f]+|\d+);/gi, (match, code: string) => {
    const point =
      code[0] === 'x' || code[0] === 'X'
        ? parseInt(code.slice(1), 16)
        : parseInt(code, 10)

    return Number.isFinite(point) && point > 0 && point <= 0x10ffff
      ? String.fromCodePoint(point)
      : match
  })
}

/**
 * Flattens a rich-text field from the CMS to plain text, without clipping it.
 *
 * Meta descriptions want the trimmed form below, but JSON-LD carries whole
 * answers and abstracts, so the strip step is shared rather than duplicated.
 */
export function htmlToPlainText(html?: string | null): string | undefined {
  if (!html) return undefined

  let text = html.replace(/<[^>]*>/g, ' ')

  // `&amp;` is decoded last so an encoded entity like `&amp;laquo;` survives as
  // literal text instead of turning into `«`.
  for (const [entity, char] of Object.entries(ENTITIES)) {
    if (entity === '&amp;') continue
    text = text.split(entity).join(char)
  }
  text = decodeNumericEntities(text)
  text = text.split('&amp;').join('&')

  text = text.replace(/\s+/g, ' ').trim()

  return text || undefined
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
  const text = htmlToPlainText(html)

  if (!text) return undefined
  if (text.length <= maxLength) return text

  const clipped = text.slice(0, maxLength)
  const lastSpace = clipped.lastIndexOf(' ')

  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).replace(/[,;:.\s]+$/, '')}…`
}
