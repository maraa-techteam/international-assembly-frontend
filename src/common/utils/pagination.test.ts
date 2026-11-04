import {
  PAGE_SIZE,
  getLastPageRedirect,
  getTotalPages,
  parsePageParam,
} from './pagination'

describe('parsePageParam', () => {
  it('reads a valid page number', () => {
    expect(parsePageParam('3')).toBe(3)
  })

  it('uses the first value when the param is repeated', () => {
    expect(parsePageParam(['2', '5'])).toBe(2)
  })

  it.each([
    ['missing', undefined],
    ['null', null],
    ['empty', ''],
    ['text', 'abc'],
    ['partly numeric', '2abc'],
    ['zero', '0'],
    ['negative', '-1'],
    ['decimal', '1.5'],
    ['beyond safe integers', '99999999999999999999'],
  ])('falls back to the first page when %s', (_, value) => {
    expect(parsePageParam(value)).toBe(1)
  })
})

describe('getTotalPages', () => {
  it('rounds a partial page up', () => {
    expect(getTotalPages(PAGE_SIZE + 1)).toBe(2)
  })

  it('does not add a page for an exact multiple', () => {
    expect(getTotalPages(PAGE_SIZE * 2)).toBe(2)
  })

  it('is zero when there are no results', () => {
    expect(getTotalPages(0)).toBe(0)
  })
})

describe('getLastPageRedirect', () => {
  it('returns null while the page is in range', () => {
    expect(getLastPageRedirect('/x', { page: '2' }, 20)).toBeNull()
  })

  it('returns null when there are no results to page through', () => {
    expect(getLastPageRedirect('/x', { page: '9' }, 0)).toBeNull()
  })

  it('points past-the-end pages at the last page', () => {
    expect(getLastPageRedirect('/x', { page: '99' }, 44)).toBe('/x?page=5')
  })

  it('keeps other params, including repeated ones, and drops limit', () => {
    expect(
      getLastPageRedirect(
        '/groups',
        { page: '99', limit: '20', country: ['Germany', 'France'] },
        11,
      ),
    ).toBe('/groups?country=Germany&country=France&page=2')
  })
})
