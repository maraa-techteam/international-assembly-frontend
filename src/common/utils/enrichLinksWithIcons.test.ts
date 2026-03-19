import { enrichLinksWithIcons } from './enrichLinksWithIcons'

describe('enrichLinksWithIcons', () => {
  describe('icon injection', () => {
    it('injects an icon into a telegram link', () => {
      const html = '<a href="https://t.me/mygroup">Join Telegram</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
      expect(result).toContain('aria-hidden="true"')
      expect(result).toContain('Join Telegram')
    })

    it('injects an icon into a youtube link', () => {
      const html =
        '<a href="https://www.youtube.com/watch?v=abc">Watch video</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
      expect(result).toContain('Watch video')
    })

    it('injects an icon into a whatsapp link', () => {
      const html = '<a href="https://wa.me/1234567890">Contact us</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
      expect(result).toContain('Contact us')
    })

    it('places the icon before the link text', () => {
      const html = '<a href="https://t.me/mygroup">Join Telegram</a>'
      const result = enrichLinksWithIcons(html)

      const iconIndex = result.indexOf('rte-social-icon')
      const textIndex = result.indexOf('Join Telegram')

      expect(iconIndex).toBeLessThan(textIndex)
    })
  })

  describe('non-social links', () => {
    it('does not modify links to unknown domains', () => {
      const html = '<a href="https://example.com">Visit us</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toBe(html)
    })

    it('does not modify links without href', () => {
      const html = '<a class="anchor">Anchor</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toBe(html)
    })

    it('does not modify links with relative hrefs', () => {
      const html = '<a href="/about">About</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toBe(html)
    })
  })

  describe('multiple links in the same HTML', () => {
    it('processes all social links in a paragraph', () => {
      const html =
        '<p><a href="https://t.me/g1">Telegram</a> and <a href="https://wa.me/123">WhatsApp</a></p>'
      const result = enrichLinksWithIcons(html)

      const iconCount = (result.match(/rte-social-icon/g) ?? []).length
      expect(iconCount).toBe(2)
    })

    it('only adds icons to social links, not unknown ones', () => {
      const html =
        '<p><a href="https://t.me/g">Telegram</a> and <a href="https://example.com">Other</a></p>'
      const result = enrichLinksWithIcons(html)

      const iconCount = (result.match(/rte-social-icon/g) ?? []).length
      expect(iconCount).toBe(1)
    })
  })

  describe('SVG accessibility attributes', () => {
    it('marks the injected icon as aria-hidden', () => {
      const html = '<a href="https://t.me/mygroup">Telegram</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('aria-hidden="true"')
    })

    it('includes the proper SVG viewBox', () => {
      const html = '<a href="https://t.me/mygroup">Telegram</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('viewBox="0 -960 960 960"')
    })
  })

  describe('links with extra attributes', () => {
    it('handles links with target and rel attributes', () => {
      const html =
        '<a href="https://t.me/group" target="_blank" rel="noopener noreferrer">Telegram</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
      expect(result).toContain('target="_blank"')
    })

    it('handles links with href using single quotes', () => {
      const html = "<a href='https://t.me/group'>Telegram</a>"
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
    })

    it('handles links with class attributes', () => {
      const html =
        '<a href="https://youtube.com/watch?v=x" class="link">Video</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
      expect(result).toContain('class="link"')
    })
  })

  describe('passthrough content', () => {
    it('returns plain text unchanged', () => {
      const html = '<p>Hello world</p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toBe(html)
    })

    it('returns empty string unchanged', () => {
      expect(enrichLinksWithIcons('')).toBe('')
    })
  })
})
