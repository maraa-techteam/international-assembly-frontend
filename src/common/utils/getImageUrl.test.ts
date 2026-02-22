import { getImageUrl } from './getImageUrl'

describe('getImageUrl', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv, DIRECTUS_CMS_URL: 'cms.example.com' }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('builds the correct asset URL', () => {
    expect(getImageUrl('abc123')).toBe('https://cms.example.com/assets/abc123')
  })

  it('includes the provided src path', () => {
    const src = 'images/photo.jpg'
    expect(getImageUrl(src)).toContain(src)
  })
})
