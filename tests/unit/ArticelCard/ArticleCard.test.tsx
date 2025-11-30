import { ArticleCardType } from '@/types/components'
import { ArticleCard } from '@/ui/components'
import { render, screen } from '@testing-library/react'

const mockProps: ArticleCardType = {
  title: 'Заголовок статьи',
  text: 'Краткое описание статьи для предварительного просмотра',
  publishedAt: '15 января 2024',
  href: '/articles/test-article',
  image: '/test-image.jpg',
}

describe('ArticleCard component', () => {
  it('renders title', () => {
    render(<ArticleCard {...mockProps} />)

    expect(screen.getByText('Заголовок статьи')).toBeInTheDocument()
  })

  it('renders text description', () => {
    render(<ArticleCard {...mockProps} />)

    expect(
      screen.getByText(
        'Краткое описание статьи для предварительного просмотра',
      ),
    ).toBeInTheDocument()
  })

  it('renders published date', () => {
    render(<ArticleCard {...mockProps} />)

    expect(screen.getByText('15 января 2024')).toBeInTheDocument()
  })

  it('renders as a link with correct href', () => {
    render(<ArticleCard {...mockProps} />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/articles/test-article')
  })

  it('renders image when image prop is provided', () => {
    render(<ArticleCard {...mockProps} />)

    const image = screen.getByAltText('Заголовок статьи')
    expect(image).toBeInTheDocument()
    const src = image.getAttribute('src')
    expect(src).toContain('test-image.jpg')
  })

  it('renders placeholder when there is no image', () => {
    const propsWithoutImage = { ...mockProps, image: '' }
    render(<ArticleCard {...propsWithoutImage} />)

    expect(screen.getByText('Картинка не найдена')).toBeInTheDocument()
  })
})
