import { ArticleCardSectionProps } from '@/types/sections'
import { ArticleCardSection } from '@/ui/sections'
import { render, screen } from '@testing-library/react'

const mockCards = [
  {
    title: 'Статья 1',
    perex: 'Описание статьи 1',
    image: null,
    link: '/article-1',
    date_created: '10 января 2024',
  },
  {
    title: 'Статья 2',
    perex: 'Описание статьи 2',
    image: null,
    link: '/article-2',
    date_created: '15 января 2024',
  },
]

const mockProps: ArticleCardSectionProps = {
  title: 'Последние статьи',
  article_cards: mockCards,
  type: 'article',
}

describe('ArticleCardSection component', () => {
  it('renders title', () => {
    render(<ArticleCardSection {...mockProps} />)

    expect(screen.getByText('Последние статьи')).toBeInTheDocument()
  })

  it('renders all cards', () => {
    render(<ArticleCardSection {...mockProps} />)

    expect(screen.getByText('Статья 1')).toBeInTheDocument()
    expect(screen.getByText('Статья 2')).toBeInTheDocument()
  })
})
