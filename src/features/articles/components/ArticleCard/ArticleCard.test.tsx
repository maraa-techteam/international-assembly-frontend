import { formatDate } from '@/common/utils/dateFormatter'
import { render, screen } from '@testing-library/react'

import { Article } from '../../types/Article.type'
import { ArticleCard } from './ArticleCard'

jest.mock('@/common/utils/getImageUrl', () => ({
  getImageUrl: (src: string) => `https://example.com/${src}`,
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string
    alt: string
    width?: number | `${number}`
    height?: number | `${number}`
  }) => <img src={src} alt={alt} width={width} height={height} />,
}))

const mockProps: Article = {
  id: '123',
  title: 'Заголовок статьи',
  slug: 'zagolovok-stati',
  perex: 'Краткое описание статьи для предварительного просмотра',
  date_created: '15 января 2024',
  image: '/test-image.jpg',
  date_updated: '',
  content: '',
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

    expect(screen.getByText(formatDate('15 января 2024'))).toBeInTheDocument()
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
