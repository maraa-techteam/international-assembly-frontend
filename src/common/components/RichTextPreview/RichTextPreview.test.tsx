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
})
