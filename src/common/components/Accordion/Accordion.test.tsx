import { render, screen } from '@testing-library/react'

import { Accordion } from './Accordion'
import { AccordionType } from './Accordion.type'

const mockItems: AccordionType[] = [
  { title: 'First question', text: <p>First answer</p> },
  {
    title: 'Second question',
    text: (
      <>
        <p>
          Second <a href='/faq'>answer</a>
        </p>
        <ul>
          <li>List item</li>
        </ul>
      </>
    ),
  },
]

describe('Accordion', () => {
  it('renders all item titles', () => {
    render(<Accordion items={mockItems} />)

    expect(screen.getByText('First question')).toBeInTheDocument()
    expect(screen.getByText('Second question')).toBeInTheDocument()
  })

  it('renders the rich content of each item', () => {
    render(<Accordion items={mockItems} />)

    expect(screen.getByText('First answer')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'answer' })).toHaveAttribute(
      'href',
      '/faq',
    )
    expect(screen.getByText('List item')).toBeInTheDocument()
  })

  it('keeps each answer inside the rich-text styles', () => {
    render(<Accordion items={mockItems} />)

    expect(screen.getByText('First answer').parentElement).toHaveClass('rte')
  })
})
