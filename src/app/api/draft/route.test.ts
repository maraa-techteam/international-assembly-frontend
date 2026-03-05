const mockDraftEnable = jest.fn()
const mockDraftDisable = jest.fn()
const mockRedirect = jest.fn()

jest.mock('next/headers', () => ({
  draftMode: jest.fn().mockResolvedValue({
    enable: mockDraftEnable,
    disable: mockDraftDisable,
    isEnabled: false,
  }),
}))

jest.mock('next/navigation', () => ({
  redirect: (url: string) => mockRedirect(url),
}))

jest.mock('next/server', () => {
  class MockNextRequest {
    nextUrl: URL
    constructor(url: string | URL) {
      this.nextUrl = typeof url === 'string' ? new URL(url) : url
    }
  }
  return { NextRequest: MockNextRequest }
})

function makeRequest(params: Record<string, string>) {
  const url = new URL('http://localhost:3000/api/draft')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const { NextRequest } = jest.requireMock<{
    NextRequest: new (url: URL) => { nextUrl: URL }
  }>('next/server')
  return new NextRequest(url)
}

describe('GET /api/draft', () => {
  const OLD_ENV = process.env

  beforeAll(() => {
    if (typeof globalThis.Response === 'undefined') {
      globalThis.Response = class MockResponse {
        status: number
        constructor(_body: unknown, init?: { status?: number }) {
          this.status = init?.status ?? 200
        }
      } as unknown as typeof Response
    }
  })

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...OLD_ENV, PREVIEW_SECRET: 'test-secret' }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  it('returns 401 when secret is missing', async () => {
    const { GET } = await import('./route')
    const req = makeRequest({ slug: 'test-slug', collection: 'article' })
    const res = await GET(req as never)
    expect(res.status).toBe(401)
  })

  it('returns 401 when secret is wrong', async () => {
    const { GET } = await import('./route')
    const req = makeRequest({
      secret: 'wrong-secret',
      slug: 'test-slug',
      collection: 'article',
    })
    const res = await GET(req as never)
    expect(res.status).toBe(401)
  })

  it('returns 400 when slug is missing', async () => {
    const { GET } = await import('./route')
    const req = makeRequest({ secret: 'test-secret', collection: 'article' })
    const res = await GET(req as never)
    expect(res.status).toBe(400)
  })

  it('returns 400 when collection is missing', async () => {
    const { GET } = await import('./route')
    const req = makeRequest({ secret: 'test-secret', slug: 'test-slug' })
    const res = await GET(req as never)
    expect(res.status).toBe(400)
  })

  it('returns 400 when collection is invalid', async () => {
    const { GET } = await import('./route')
    const req = makeRequest({
      secret: 'test-secret',
      slug: 'test-slug',
      collection: 'unknown',
    })
    const res = await GET(req as never)
    expect(res.status).toBe(400)
  })

  it('enables draft mode and redirects for article collection', async () => {
    const { GET } = await import('./route')
    const req = makeRequest({
      secret: 'test-secret',
      slug: 'my-article',
      collection: 'article',
    })
    await GET(req as never)
    expect(mockDraftEnable).toHaveBeenCalled()
    expect(mockRedirect).toHaveBeenCalledWith('/news-and-events/my-article')
  })

  it('enables draft mode and redirects for groups collection', async () => {
    const { GET } = await import('./route')
    const req = makeRequest({
      secret: 'test-secret',
      slug: 'my-group',
      collection: 'groups',
    })
    await GET(req as never)
    expect(mockDraftEnable).toHaveBeenCalled()
    expect(mockRedirect).toHaveBeenCalledWith('/groups/my-group')
  })
})
