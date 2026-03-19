import { render, screen } from '@testing-library/react'

import { RichTextPreview } from './RichTextPreview'

describe('RichTextPreview', () => {
  it('renders provided HTML content', () => {
    render(<RichTextPreview htmlContent='<p>Hello world</p>' />)

    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('applies the rte class by default', () => {
    const { container } = render(
      <RichTextPreview htmlContent='<p>Content</p>' />,
    )

    expect(container.firstChild).toHaveClass('rte')
  })

  it('applies additional className when provided', () => {
    const { container } = render(
      <RichTextPreview htmlContent='<p>Content</p>' className='extra-class' />,
    )

    expect(container.firstChild).toHaveClass('rte', 'extra-class')
  })

  it('strips disallowed tags from HTML content', () => {
    render(<RichTextPreview htmlContent='<script>alert("xss")</script>safe' />)

    expect(screen.getByText('safe')).toBeInTheDocument()
    expect(screen.queryByText('alert("xss")')).not.toBeInTheDocument()
  })

  describe('social media icon injection', () => {
    it('injects an icon for a telegram link', () => {
      const { container } = render(
        <RichTextPreview htmlContent='<p><a href="https://t.me/mygroup">Join Telegram</a></p>' />,
      )

      expect(container.querySelector('.rte-social-icon')).toBeInTheDocument()
    })

    it('injects an icon for a youtube link', () => {
      const { container } = render(
        <RichTextPreview htmlContent='<p><a href="https://www.youtube.com/watch?v=abc">Watch</a></p>' />,
      )

      expect(container.querySelector('.rte-social-icon')).toBeInTheDocument()
    })

    it('injects an icon for a whatsapp link', () => {
      const { container } = render(
        <RichTextPreview htmlContent='<p><a href="https://wa.me/1234567890">Contact us</a></p>' />,
      )

      expect(container.querySelector('.rte-social-icon')).toBeInTheDocument()
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

    it('injects a website icon for a standalone external link', () => {
      const { container } = render(
        <RichTextPreview htmlContent='<p><a href="https://example.com">Visit us</a></p>' />,
      )

      expect(container.querySelector('.rte-social-icon')).toBeInTheDocument()
    })

    it('injects a phone icon for a standalone tel: link', () => {
      const { container } = render(
        <RichTextPreview htmlContent='<p><a href="tel:+1234567890">Call us</a></p>' />,
      )

      expect(container.querySelector('.rte-social-icon')).toBeInTheDocument()
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
