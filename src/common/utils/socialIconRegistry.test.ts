import { detectSocialPlatform } from './socialIconRegistry'

describe('detectSocialPlatform', () => {
  describe('YouTube', () => {
    it('detects youtube.com', () => {
      expect(detectSocialPlatform('https://youtube.com/watch?v=abc')).toBe(
        'youtube',
      )
    })

    it('detects www.youtube.com', () => {
      expect(detectSocialPlatform('https://www.youtube.com/channel/123')).toBe(
        'youtube',
      )
    })

    it('detects youtu.be short link', () => {
      expect(detectSocialPlatform('https://youtu.be/abc123')).toBe('youtube')
    })

    it('detects m.youtube.com', () => {
      expect(detectSocialPlatform('https://m.youtube.com/watch?v=x')).toBe(
        'youtube',
      )
    })
  })

  describe('Telegram', () => {
    it('detects t.me', () => {
      expect(detectSocialPlatform('https://t.me/mygroup')).toBe('telegram')
    })

    it('detects telegram.me', () => {
      expect(detectSocialPlatform('https://telegram.me/mygroup')).toBe(
        'telegram',
      )
    })

    it('detects telegram.org', () => {
      expect(detectSocialPlatform('https://telegram.org')).toBe('telegram')
    })
  })

  describe('WhatsApp', () => {
    it('detects wa.me', () => {
      expect(detectSocialPlatform('https://wa.me/1234567890')).toBe('whatsapp')
    })

    it('detects whatsapp.com', () => {
      expect(detectSocialPlatform('https://whatsapp.com/download')).toBe(
        'whatsapp',
      )
    })

    it('detects www.whatsapp.com', () => {
      expect(detectSocialPlatform('https://www.whatsapp.com')).toBe('whatsapp')
    })
  })

  describe('unknown or unsupported domains', () => {
    it('returns null for unknown domain', () => {
      expect(detectSocialPlatform('https://example.com')).toBeNull()
    })

    it('returns null for relative path', () => {
      expect(detectSocialPlatform('/about')).toBeNull()
    })

    it('returns null for invalid URL', () => {
      expect(detectSocialPlatform('not a url')).toBeNull()
    })

    it('returns null for empty string', () => {
      expect(detectSocialPlatform('')).toBeNull()
    })

    it('does not match partial domain names', () => {
      expect(detectSocialPlatform('https://faket.me.example.com')).toBeNull()
    })
  })

  describe('URLs with query parameters and paths', () => {
    it('handles URLs with tracking parameters', () => {
      expect(
        detectSocialPlatform(
          'https://www.youtube.com/watch?v=abc&utm_source=email',
        ),
      ).toBe('youtube')
    })

    it('handles URLs with hash fragments', () => {
      expect(detectSocialPlatform('https://t.me/channel#message1')).toBe(
        'telegram',
      )
    })
  })
})
