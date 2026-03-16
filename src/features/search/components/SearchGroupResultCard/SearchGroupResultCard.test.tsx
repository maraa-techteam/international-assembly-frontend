import { render, screen } from '@testing-library/react'

import { GroupSearchResult } from '../../types/SearchResult.type'
import { SearchGroupResultCard } from './SearchGroupResultCard'

const mockProps: GroupSearchResult = {
  id: '1',
  name: 'Группа анонимных алкоголиков',
  slug: 'gruppa-anonimnykh-alkogolikov',
  description: 'Описание группы',
  country: 'Россия',
  presence: 'очная',
}

describe('SearchGroupResultCard component', () => {
  it('renders group name', () => {
    render(<SearchGroupResultCard {...mockProps} />)

    expect(screen.getByText('Группа анонимных алкоголиков')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<SearchGroupResultCard {...mockProps} />)

    expect(screen.getByText('Описание группы')).toBeInTheDocument()
  })

  it('renders country label', () => {
    render(<SearchGroupResultCard {...mockProps} />)

    expect(screen.getByText('Россия')).toBeInTheDocument()
  })

  it('renders presence label', () => {
    render(<SearchGroupResultCard {...mockProps} />)

    expect(screen.getByText('очная')).toBeInTheDocument()
  })

  it('links to the correct group page', () => {
    render(<SearchGroupResultCard {...mockProps} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'href',
      '/groups/gruppa-anonimnykh-alkogolikov',
    )
  })

  it('does not render country label when country is empty', () => {
    render(<SearchGroupResultCard {...mockProps} country='' />)

    expect(screen.queryByText('Россия')).not.toBeInTheDocument()
  })

  it('does not render presence label when presence is empty', () => {
    render(<SearchGroupResultCard {...mockProps} presence='' />)

    expect(screen.queryByText('очная')).not.toBeInTheDocument()
  })
})
