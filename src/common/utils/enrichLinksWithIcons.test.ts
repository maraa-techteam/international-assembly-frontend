import { enrichLinksWithIcons } from './enrichLinksWithIcons'

describe('enrichLinksWithIcons', () => {
  describe('icon injection (block/standalone links only)', () => {
    it('injects an icon into a standalone telegram link', () => {
      const html = '<p><a href="https://t.me/mygroup">Join Telegram</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
      expect(result).toContain('aria-hidden="true"')
      expect(result).toContain('Join Telegram')
    })

    it('injects an icon into a standalone youtube link', () => {
      const html =
        '<p><a href="https://www.youtube.com/watch?v=abc">Watch video</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
      expect(result).toContain('Watch video')
    })

    it('injects an icon into a standalone whatsapp link', () => {
      const html = '<p><a href="https://wa.me/1234567890">Contact us</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
      expect(result).toContain('Contact us')
    })

    it('places the icon before the link text', () => {
      const html = '<p><a href="https://t.me/mygroup">Join Telegram</a></p>'
      const result = enrichLinksWithIcons(html)

      const iconIndex = result.indexOf('rte-social-icon')
      const textIndex = result.indexOf('Join Telegram')

      expect(iconIndex).toBeLessThan(textIndex)
    })

    it('injects a phone icon for a standalone tel: link', () => {
      const html = '<p><a href="tel:+1234567890">+1234567890</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
    })

    it('injects a website icon for a standalone external link', () => {
      const html = '<p><a href="https://example.com">Visit us</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
    })
  })

  describe('inline links — no icons', () => {
    it('does NOT inject an icon for a social link inline in a paragraph', () => {
      const html =
        '<p>Join us on <a href="https://t.me/mygroup">Telegram</a> today</p>'
      const result = enrichLinksWithIcons(html)

      expect(result).not.toContain('rte-social-icon')
    })

    it('does NOT inject an icon for an inline whatsapp link', () => {
      const html =
        '<p>Message us on <a href="https://wa.me/123">WhatsApp</a>.</p>'
      const result = enrichLinksWithIcons(html)

      expect(result).not.toContain('rte-social-icon')
    })

    it('does NOT inject an icon for an inline youtube link', () => {
      const html =
        '<p>Watch the <a href="https://youtube.com/watch?v=x">video</a> here.</p>'
      const result = enrichLinksWithIcons(html)

      expect(result).not.toContain('rte-social-icon')
    })

    it('does NOT inject a phone icon when the tel: link is inline', () => {
      const html =
        '<p>Call us at <a href="tel:+1234567890">+1234567890</a> anytime</p>'
      const result = enrichLinksWithIcons(html)

      expect(result).not.toContain('rte-social-icon')
    })

    it('does NOT inject a website icon when the external link is inline', () => {
      const html =
        '<p>See our <a href="https://example.com">website</a> for more.</p>'
      const result = enrichLinksWithIcons(html)

      expect(result).not.toContain('rte-social-icon')
    })

    it('does not modify bare <a> links (not inside a <p>)', () => {
      const html = '<a href="https://t.me/mygroup">Join Telegram</a>'
      const result = enrichLinksWithIcons(html)

      expect(result).toBe(html)
    })

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
    it('does NOT inject icons for multiple social links in a single paragraph', () => {
      const html =
        '<p><a href="https://t.me/g1">Telegram</a> and <a href="https://wa.me/123">WhatsApp</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).not.toContain('rte-social-icon')
    })

    it('injects exactly one icon per standalone social link', () => {
      const html =
        '<p><a href="https://t.me/g1">Telegram</a></p><p><a href="https://wa.me/123">WhatsApp</a></p>'
      const result = enrichLinksWithIcons(html)

      const iconCount = (result.match(/rte-social-icon/g) ?? []).length
      expect(iconCount).toBe(2)
    })
  })

  describe('SVG accessibility attributes', () => {
    it('marks the injected icon as aria-hidden', () => {
      const html = '<p><a href="https://t.me/mygroup">Telegram</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('aria-hidden="true"')
    })

    it('includes the proper SVG viewBox', () => {
      const html = '<p><a href="https://t.me/mygroup">Telegram</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('viewBox="0 -960 960 960"')
    })
  })

  describe('links with extra attributes', () => {
    it('handles standalone links with target and rel attributes', () => {
      const html =
        '<p><a href="https://t.me/group" target="_blank" rel="noopener noreferrer">Telegram</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
      expect(result).toContain('target="_blank"')
    })

    it('handles standalone links with href using single quotes', () => {
      const url = 'https://t.me/group'
      const html = `<p><a href='${url}'>Telegram</a></p>`
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
    })

    it('handles standalone links with class attributes', () => {
      const html =
        '<p><a href="https://youtube.com/watch?v=x" class="link">Video</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
      expect(result).toContain('class="link"')
    })

    it('preserves <p> attributes when injecting a block-level icon', () => {
      const html =
        '<p class="contact"><a href="tel:+1234567890">+1234567890</a></p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('class="contact"')
      expect(result).toContain('rte-social-icon')
    })

    it('tolerates leading and trailing whitespace inside <p>', () => {
      const html = '<p>  <a href="tel:+1234567890">Call</a>  </p>'
      const result = enrichLinksWithIcons(html)

      expect(result).toContain('rte-social-icon')
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
