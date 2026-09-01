import { render, screen } from '@testing-library/react'

import { RichTextPreview } from './RichTextPreview'

describe('RichTextPreview', () => {
  it('renders provided HTML content', () => {
    render(<RichTextPreview htmlContent='<p>Hello world</p>' />)

    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('strips disallowed tags from HTML content', () => {
    render(<RichTextPreview htmlContent='<script>alert("xss")</script>safe' />)

    expect(screen.getByText('safe')).toBeInTheDocument()
    expect(screen.queryByText('alert("xss")')).not.toBeInTheDocument()
  })

  // Which URLs count as which platform is covered exhaustively in
  // socialIconRegistry.test.ts; these cover only the injection itself.
  describe('social media icon injection', () => {
    it('injects an icon for a standalone social link', () => {
      const { container } = render(
        <RichTextPreview htmlContent='<p><a href="https://t.me/mygroup">Join Telegram</a></p>' />,
      )

      expect(container.querySelector('.rte-social-icon')).toBeInTheDocument()
    })

    it('injects an icon for a standalone external or tel: link', () => {
      const { container: website } = render(
        <RichTextPreview htmlContent='<p><a href="https://example.com">Visit us</a></p>' />,
      )
      expect(website.querySelector('.rte-social-icon')).toBeInTheDocument()

      const { container: phone } = render(
        <RichTextPreview htmlContent='<p><a href="tel:+1234567890">Call us</a></p>' />,
      )
      expect(phone.querySelector('.rte-social-icon')).toBeInTheDocument()
    })

    it('does not inject an icon for a social link that is inline in a paragraph', () => {
      const { container } = render(
        <RichTextPreview htmlContent='<p>Join us on <a href="https://t.me/mygroup">Telegram</a> today.</p>' />,
      )

      expect(
        container.querySelector('.rte-social-icon'),
      ).not.toBeInTheDocument()
    })

    it('does not inject an icon for an unknown link that is inline in a paragraph', () => {
      const { container } = render(
        <RichTextPreview htmlContent='<p>Check out <a href="https://example.com">this site</a> for more.</p>' />,
      )

      expect(
        container.querySelector('.rte-social-icon'),
      ).not.toBeInTheDocument()
    })

    it('does not inject a phone icon when the tel: link is inline', () => {
      const { container } = render(
        <RichTextPreview htmlContent='<p>Call us at <a href="tel:+1234567890">+1234567890</a> anytime.</p>' />,
      )

      expect(
        container.querySelector('.rte-social-icon'),
      ).not.toBeInTheDocument()
    })

    it('marks injected icons as aria-hidden for accessibility', () => {
      const { container } = render(
        <RichTextPreview htmlContent='<p><a href="https://t.me/mygroup">Telegram</a></p>' />,
      )

      const icon = container.querySelector('.rte-social-icon')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
