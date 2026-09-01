import { render, screen } from '@testing-library/react'

import { ServiceSearchResult } from '../../types/SearchResult.type'
import { SearchServiceResultCard } from './SearchServiceResultCard'

const mockProps: ServiceSearchResult = {
  id: '1',
  name: 'Служение на конференции',
  slug: 'sluzhenie-na-konferentsii',
  description: 'Описание вида служения',
  category: ['Конференция'],
  engagement: ['Очное'],
  required_sobriety_time: '1 год',
}

describe('SearchServiceResultCard component', () => {
  it('renders the service and all of its labels', () => {
    render(<SearchServiceResultCard {...mockProps} />)

    expect(screen.getByText('Служение на конференции')).toBeInTheDocument()
    expect(screen.getByText('Описание вида служения')).toBeInTheDocument()
    expect(screen.getByText('Конференция')).toBeInTheDocument()
    expect(screen.getByText('Очное')).toBeInTheDocument()
    expect(screen.getByText('1 год')).toBeInTheDocument()
  })

  it('links to the correct service page', () => {
    render(<SearchServiceResultCard {...mockProps} />)

    const link = screen.getByRole('link', {
      name: /Служение на конференции/,
    })
    expect(link).toHaveAttribute('href', '/services/sluzhenie-na-konferentsii')
  })

  it('does not render description when it is empty', () => {
    render(<SearchServiceResultCard {...mockProps} description='' />)

    expect(screen.queryByText('Описание вида служения')).not.toBeInTheDocument()
  })

  it('does not render sobriety time label when it is null', () => {
    render(
      <SearchServiceResultCard {...mockProps} required_sobriety_time={null} />,
    )

    expect(screen.queryByText('1 год')).not.toBeInTheDocument()
  })
})
