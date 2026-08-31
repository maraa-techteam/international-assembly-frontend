import { formatDate } from '@/common/utils/dateFormatter'
import { render, screen } from '@testing-library/react'

import { SearchPostCard } from './SearchPostCard'
import { SearchPostCardProps } from './SearchPostCard.type'

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

const mockProps: SearchPostCardProps = {
  id: '1',
  title: 'Заголовок результата поиска',
  slug: 'zagolovok-rezultata-poiska',
  perex: 'Краткое описание найденного материала',
  date_created: '2024-01-15T00:00:00.000Z',
  image: '/test-image.jpg',
  url: '/news-and-events/zagolovok-rezultata-poiska',
}

describe('SearchPostCard component', () => {
  it('renders title', () => {
    render(<SearchPostCard {...mockProps} />)

    expect(screen.getByText('Заголовок результата поиска')).toBeInTheDocument()
  })

  it('renders perex text', () => {
    render(<SearchPostCard {...mockProps} />)

    expect(
      screen.getByText('Краткое описание найденного материала'),
    ).toBeInTheDocument()
  })

  it('renders published date', () => {
    render(<SearchPostCard {...mockProps} />)

    expect(
      screen.getByText(formatDate('2024-01-15T00:00:00.000Z')),
    ).toBeInTheDocument()
  })

  it('renders image when image prop is provided', () => {
    render(<SearchPostCard {...mockProps} />)

    const image = screen.getByAltText('Заголовок результата поиска')
    expect(image).toBeInTheDocument()
    expect(image.getAttribute('src')).toContain('test-image.jpg')
  })

  it('renders placeholder when there is no image', () => {
    render(<SearchPostCard {...mockProps} image={null} />)

    expect(screen.getByText('Картинка не найдена')).toBeInTheDocument()
  })

  it('links to the correct article page', () => {
    render(<SearchPostCard {...mockProps} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'href',
      '/news-and-events/zagolovok-rezultata-poiska',
    )
  })
})
