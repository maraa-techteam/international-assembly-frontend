import { toMetaDescription } from './toMetaDescription'

describe('toMetaDescription', () => {
  it('returns undefined for empty input', () => {
    expect(toMetaDescription(undefined)).toBeUndefined()
    expect(toMetaDescription(null)).toBeUndefined()
    expect(toMetaDescription('')).toBeUndefined()
  })

  it('returns undefined when the markup has no text', () => {
    expect(toMetaDescription('<p></p><br>')).toBeUndefined()
  })

  it('strips tags and collapses whitespace', () => {
    expect(toMetaDescription('<p>Формат встреч:  закрытые</p>')).toBe(
      'Формат встреч: закрытые',
    )
  })

  it('keeps words apart when a block tag separated them', () => {
    expect(toMetaDescription('<p>Вторник<br>Пятница</p>')).toBe(
      'Вторник Пятница',
    )
  })

  it('decodes common html entities', () => {
    expect(
      toMetaDescription('<p>&laquo;Язык сердца&raquo; &mdash; стр.221</p>'),
    ).toBe('«Язык сердца» — стр.221')
  })

  it('decodes &amp; last so encoded entities stay literal', () => {
    expect(toMetaDescription('<p>A &amp; B &amp;laquo;C</p>')).toBe(
      'A & B &laquo;C',
    )
  })

  it('leaves text at or under the limit untouched', () => {
    const text = 'a'.repeat(160)
    expect(toMetaDescription(`<p>${text}</p>`)).toBe(text)
  })

  it('truncates on a word boundary and appends an ellipsis', () => {
    const result = toMetaDescription(`<p>${'слово '.repeat(60)}</p>`)

    expect(result).toBeDefined()
    expect(result!.length).toBeLessThanOrEqual(161)
    expect(result!.endsWith('…')).toBe(true)
    expect(result).not.toContain(' …')
  })

  it('respects a custom max length', () => {
    expect(toMetaDescription('<p>one two three four</p>', 8)).toBe('one two…')
  })
})

describe('entity decoding', () => {
  it('decodes Latin-1 letters that appear in European addresses', () => {
    expect(toMetaDescription('<p>Metro "It&auml;keskus"</p>')).toBe(
      'Metro "Itäkeskus"',
    )
  })

  it('decodes decimal and hex numeric entities', () => {
    expect(
      toMetaDescription('<p>caf&#233; &#x43A;&#x43E;&#x444;&#x435;</p>'),
    ).toBe('café кофе')
  })

  it('leaves a malformed numeric entity alone', () => {
    expect(toMetaDescription('<p>&#x110000; &#0;</p>')).toBe('&#x110000; &#0;')
  })
})
