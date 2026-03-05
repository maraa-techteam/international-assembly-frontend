const mockDraftDisable = jest.fn()
const mockRedirect = jest.fn()

jest.mock('next/headers', () => ({
  draftMode: jest.fn().mockResolvedValue({
    enable: jest.fn(),
    disable: mockDraftDisable,
    isEnabled: true,
  }),
}))

jest.mock('next/navigation', () => ({
  redirect: (url: string) => mockRedirect(url),
}))

describe('GET /api/disable-draft', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('disables draft mode and redirects to home', async () => {
    const { GET } = await import('./route')
    await GET()
    expect(mockDraftDisable).toHaveBeenCalled()
    expect(mockRedirect).toHaveBeenCalledWith('/')
  })
})
