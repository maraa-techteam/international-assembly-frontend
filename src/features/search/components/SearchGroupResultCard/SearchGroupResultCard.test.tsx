import { render, screen } from '@testing-library/react'

import { GroupSearchResult } from '../../types/SearchResult.type'
import { SearchGroupResultCard } from './SearchGroupResultCard'

const mockProps: GroupSearchResult = {
  id: '1',
  name: 'Группа анонимных алкоголиков',
  slug: 'gruppa-anonimnykh-alkogolikov',
  description: '<p>Описание группы</p>',
  country: 'Россия',
  presence: 'очная',
  website: 'https://example.com',
  youtube: 'https://youtube.com/example',
  telegram: 'https://t.me/example',
  whatsapp: 'https://wa.me/example',
}

describe('SearchGroupResultCard component', () => {
  it('renders the group, its labels and every social link', () => {
    render(<SearchGroupResultCard {...mockProps} />)

    expect(screen.getByText('Группа анонимных алкоголиков')).toBeInTheDocument()
    expect(screen.getByText('Описание группы')).toBeInTheDocument()
    expect(screen.getByText('Россия')).toBeInTheDocument()
    expect(screen.getByText('очная')).toBeInTheDocument()
    expect(screen.getByText('Веб-сайт')).toBeInTheDocument()
    expect(screen.getByText('YouTube')).toBeInTheDocument()
    expect(screen.getByText('Telegram')).toBeInTheDocument()
    expect(screen.getByText('WhatsApp')).toBeInTheDocument()
  })

  it('links to the correct group page', () => {
    render(<SearchGroupResultCard {...mockProps} />)

    const link = screen.getByRole('link', {
      name: /Группа анонимных алкоголиков/,
    })
    expect(link).toHaveAttribute(
      'href',
      '/groups/gruppa-anonimnykh-alkogolikov',
    )
  })

  it('clamps the description so long CMS prose cannot stretch the card', () => {
    const { container } = render(<SearchGroupResultCard {...mockProps} />)

    const rtePreviews = container.querySelectorAll('.rte')
    expect(rtePreviews.length).toBeGreaterThan(0)
    expect(rtePreviews[0]).toHaveClass('rte-clamp')
  })

  it('does not render description when it is not provided', () => {
    render(<SearchGroupResultCard {...mockProps} description={null} />)

    expect(screen.queryByText('Описание группы')).not.toBeInTheDocument()
  })

  it('does not render country label when country is empty', () => {
    render(<SearchGroupResultCard {...mockProps} country='' />)

    expect(screen.queryByText('Россия')).not.toBeInTheDocument()
  })

  it('does not render presence label when presence is empty', () => {
    render(<SearchGroupResultCard {...mockProps} presence='' />)

    expect(screen.queryByText('очная')).not.toBeInTheDocument()
  })

  it('does not render social links section when no links are provided', () => {
    render(
      <SearchGroupResultCard
        {...mockProps}
        website={null}
        youtube={null}
        telegram={null}
        whatsapp={null}
      />,
    )

    expect(screen.queryByText('Веб-сайт')).not.toBeInTheDocument()
  })
})
