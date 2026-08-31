import { STATIC_ROUTES } from './routes'
import { PAGE_SEO, buildPageMetadata, routesMissingSeo } from './seo'

describe('PAGE_SEO', () => {
  it('covers every static route', () => {
    expect(routesMissingSeo()).toEqual([])
  })

  it('has no duplicate titles', () => {
    // Two pages sharing a title compete for the same query. `/groups` and
    // `/about-groups` both shipped as "Поиск группы" before this.
    const titles = Object.values(PAGE_SEO).map((entry) => entry.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('has no duplicate descriptions', () => {
    const descriptions = Object.values(PAGE_SEO).map(
      (entry) => entry.description,
    )
    expect(new Set(descriptions).size).toBe(descriptions.length)
  })

  it('keeps every rendered title inside the length search results show', () => {
    const tooLong = STATIC_ROUTES.filter((path) => {
      const title = buildPageMetadata({ path }).title as string
      return title.length > 60
    })
    expect(tooLong).toEqual([])
  })

  it('keeps descriptions in the range search results show', () => {
    const outOfRange = Object.entries(PAGE_SEO)
      .filter(
        ([, entry]) =>
          entry.description.length < 70 || entry.description.length > 160,
      )
      .map(([path]) => path)
    expect(outOfRange).toEqual([])
  })

  it('does not describe a page by repeating its own title', () => {
    const lazy = Object.entries(PAGE_SEO)
      .filter(([, entry]) => entry.description.trim() === entry.title.trim())
      .map(([path]) => path)
    expect(lazy).toEqual([])
  })
})

describe('buildPageMetadata', () => {
  it('prefers the CMS title over the default', () => {
    const meta = buildPageMetadata({ title: 'Из CMS', path: '/faq' })
    expect(meta.title).toBe('Из CMS | Международная Ассамблея АА')
  })

  it('falls back to the route default when the CMS field is empty', () => {
    const meta = buildPageMetadata({ title: '   ', path: '/faq' })
    expect(meta.title).toBe(
      'Вопросы и ответы об АА | Международная Ассамблея АА',
    )
    expect(meta.description).toBe(PAGE_SEO['/faq'].description)
  })

  it('leaves the brand suffix off a standalone title', () => {
    const meta = buildPageMetadata({ path: '/' })
    expect(meta.title).toBe('Анонимные Алкоголики на русском языке')
  })

  it('uses an explicit fallback for routes with no default, such as detail pages', () => {
    const meta = buildPageMetadata({
      path: '/groups/some-group',
      fallbackTitle: 'Группа АА',
      fallbackDescription: 'Описание группы.',
    })
    expect(meta.title).toBe('Группа АА | Международная Ассамблея АА')
    expect(meta.description).toBe('Описание группы.')
  })

  it('never emits an undefined title', () => {
    expect(buildPageMetadata({ path: '/unknown' }).title).toBe(
      'Международная Ассамблея АА',
    )
  })

  it('sets a root-relative canonical', () => {
    expect(buildPageMetadata({ path: '/faq' }).alternates?.canonical).toBe(
      '/faq',
    )
  })
})
