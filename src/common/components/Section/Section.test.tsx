import { render, screen } from '@testing-library/react'

import { Section } from './Section'

describe('Section', () => {
  it('renders children', () => {
    render(<Section color='white'>Hello</Section>)

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders as a section element', () => {
    const { container } = render(<Section color='white'>Content</Section>)

    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('applies color class', () => {
    const { container } = render(<Section color='primary'>Content</Section>)

    expect(container.querySelector('section')).toHaveClass('bg-primary')
  })

  it('applies additional className when provided', () => {
    const { container } = render(
      <Section color='white' className='custom-class'>
        Content
      </Section>,
    )

    expect(container.querySelector('section')).toHaveClass('custom-class')
  })

  it('applies alignment class', () => {
    const { container } = render(
      <Section color='white' alignment='center'>
        Content
      </Section>,
    )

    expect(container.querySelector('section')).toHaveClass('justify-center')
  })
})
