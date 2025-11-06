import { CardSectionProps } from '@/types/sections'
import { CardSection } from '@/ui/sections'
import { render, screen } from '@testing-library/react'

const mockCards = [
  {
    title: 'Статья 1',
    text: 'Описание статьи 1',
    image: null,
    href: '/article-1',
    publishedAt: '10 января 2024',
  },
  {
    title: 'Статья 2',
    text: 'Описание статьи 2',
    image: null,
    href: '/article-2',
    publishedAt: '15 января 2024',
  },
]

const mockProps: CardSectionProps = {
  title: 'Последние статьи',
  cards: mockCards,
  type: 'article',
}

describe('CardSection component', () => {
  it('renders title', () => {
    render(<CardSection {...mockProps} />)

    expect(screen.getByText('Последние статьи')).toBeInTheDocument()
  })

  it('renders all cards', () => {
    render(<CardSection {...mockProps} />)

    expect(screen.getByText('Статья 1')).toBeInTheDocument()
    expect(screen.getByText('Статья 2')).toBeInTheDocument()
  })
})
