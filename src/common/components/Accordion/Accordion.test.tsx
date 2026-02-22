import { render, screen } from '@testing-library/react'

import { Accordion } from './Accordion'

const mockItems = [
  { title: 'First question', text: '<p>First answer</p>' },
  { title: 'Second question', text: '<p>Second answer</p>' },
]

describe('Accordion', () => {
  it('renders all item titles', () => {
    render(<Accordion items={mockItems} />)

    expect(screen.getByText('First question')).toBeInTheDocument()
    expect(screen.getByText('Second question')).toBeInTheDocument()
  })

  it('renders the HTML content of each item', () => {
    render(<Accordion items={mockItems} />)

    expect(screen.getByText('First answer')).toBeInTheDocument()
    expect(screen.getByText('Second answer')).toBeInTheDocument()
  })

  it('renders the correct number of accordion items', () => {
    const { container } = render(<Accordion items={mockItems} />)

    const details = container.querySelectorAll('details')
    expect(details.length).toBe(mockItems.length)
  })
})
