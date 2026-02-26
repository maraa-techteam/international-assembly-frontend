import { getImageUrl } from './getImageUrl'

describe('getImageUrl', () => {
  const originalEnv = process.env.NEXT_PUBLIC_DIRECTUS_CMS_URL

  beforeEach(() => {
    process.env.NEXT_PUBLIC_DIRECTUS_CMS_URL = 'cms.example.com'
  })

  afterEach(() => {
    process.env.NEXT_PUBLIC_DIRECTUS_CMS_URL = originalEnv
  })

  it('builds the correct asset URL', () => {
    expect(getImageUrl('abc123')).toBe('https://cms.example.com/assets/abc123')
  })

  it('includes the provided src path', () => {
    const src = 'images/photo.jpg'
    expect(getImageUrl(src)).toContain(src)
  })
})
