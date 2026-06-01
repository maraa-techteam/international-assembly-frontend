import { fireEvent, render, screen } from '@testing-library/react'
import { type ReactNode } from 'react'

import { Gallery } from './Gallery'
import { ImageType } from './Gallery.type'

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

jest.mock('@/common/hooks/useEscapeClose', () => ({
  useEscapeClose: jest.fn(),
}))

jest.mock('@/common/components/Icon/Icon', () => ({
  Icon: () => <div />,
}))

jest.mock('@/common/components/Typography/Typography', () => ({
  Typography: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}))

jest.mock('@/common/components/Grid/Grid', () => ({
  Grid: ({ children }: { children: ReactNode }) => <ul>{children}</ul>,
}))

const mockImages: ImageType[] = [
  { id: '1', directus_files_id: 'image1.jpg' },
  { id: '2', directus_files_id: 'image2.jpg' },
  { id: '3', directus_files_id: 'image3.jpg' },
]

describe('Gallery', () => {
  it('renders all gallery thumbnails', () => {
    render(<Gallery images={mockImages} />)
    const thumbnails = screen.getAllByAltText('Изображение')
    expect(thumbnails).toHaveLength(mockImages.length)
  })

  it('does not show modal initially', () => {
    render(<Gallery images={mockImages} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens modal when clicking a thumbnail', () => {
    render(<Gallery images={mockImages} />)
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('shows the first image in the modal when opening the first thumbnail', () => {
    render(<Gallery images={mockImages} />)
    fireEvent.click(screen.getAllByRole('button')[0])
    const selectedImage = screen.getByAltText('Выбранное изображение')
    expect(selectedImage).toHaveAttribute(
      'src',
      expect.stringContaining('image1.jpg'),
    )
  })

  it('closes modal when clicking the close button', () => {
    render(<Gallery images={mockImages} />)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Закрыть просмотр изображений'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('navigates to the next image', () => {
    render(<Gallery images={mockImages} />)
    fireEvent.click(screen.getAllByRole('button')[0])

    fireEvent.click(screen.getByLabelText('Следующее изображение'))

    const selectedImage = screen.getByAltText('Выбранное изображение')
    expect(selectedImage).toHaveAttribute(
      'src',
      expect.stringContaining('image2.jpg'),
    )
  })

  it('navigates to the previous image', () => {
    render(<Gallery images={mockImages} />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByLabelText('Следующее изображение'))

    fireEvent.click(screen.getByLabelText('Предыдущее изображение'))

    const selectedImage = screen.getByAltText('Выбранное изображение')
    expect(selectedImage).toHaveAttribute(
      'src',
      expect.stringContaining('image1.jpg'),
    )
  })

  it('wraps around to the last image when navigating previous from the first', () => {
    render(<Gallery images={mockImages} />)
    fireEvent.click(screen.getAllByRole('button')[0])

    fireEvent.click(screen.getByLabelText('Предыдущее изображение'))

    const selectedImage = screen.getByAltText('Выбранное изображение')
    expect(selectedImage).toHaveAttribute(
      'src',
      expect.stringContaining('image3.jpg'),
    )
  })

  it('wraps around to the first image when navigating next from the last', () => {
    render(<Gallery images={mockImages} />)
    // Open the last thumbnail
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[mockImages.length - 1])

    fireEvent.click(screen.getByLabelText('Следующее изображение'))

    const selectedImage = screen.getByAltText('Выбранное изображение')
    expect(selectedImage).toHaveAttribute(
      'src',
      expect.stringContaining('image1.jpg'),
    )
  })

  it('navigates to a specific image via dot navigation', () => {
    render(<Gallery images={mockImages} />)
    fireEvent.click(screen.getAllByRole('button')[0])

    fireEvent.click(screen.getByLabelText('Перейти к изображению 3'))

    const selectedImage = screen.getByAltText('Выбранное изображение')
    expect(selectedImage).toHaveAttribute(
      'src',
      expect.stringContaining('image3.jpg'),
    )
  })

  it('navigates to next image on left swipe', () => {
    render(<Gallery images={mockImages} />)
    fireEvent.click(screen.getAllByRole('button')[0])

    const imageContainer = screen
      .getByAltText('Выбранное изображение')
      .closest('div')!
    fireEvent.touchStart(imageContainer, {
      targetTouches: [{ clientX: 200 }],
    })
    fireEvent.touchMove(imageContainer, {
      targetTouches: [{ clientX: 100 }],
    })
    fireEvent.touchEnd(imageContainer)

    const selectedImage = screen.getByAltText('Выбранное изображение')
    expect(selectedImage).toHaveAttribute(
      'src',
      expect.stringContaining('image2.jpg'),
    )
  })

  it('navigates to previous image on right swipe', () => {
    render(<Gallery images={mockImages} />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByLabelText('Следующее изображение'))

    const imageContainer = screen
      .getByAltText('Выбранное изображение')
      .closest('div')!
    fireEvent.touchStart(imageContainer, {
      targetTouches: [{ clientX: 100 }],
    })
    fireEvent.touchMove(imageContainer, {
      targetTouches: [{ clientX: 200 }],
    })
    fireEvent.touchEnd(imageContainer)

    const selectedImage = screen.getByAltText('Выбранное изображение')
    expect(selectedImage).toHaveAttribute(
      'src',
      expect.stringContaining('image1.jpg'),
    )
  })

  it('does not navigate on swipe below minimum distance', () => {
    render(<Gallery images={mockImages} />)
    fireEvent.click(screen.getAllByRole('button')[0])

    const imageContainer = screen
      .getByAltText('Выбранное изображение')
      .closest('div')!
    fireEvent.touchStart(imageContainer, {
      targetTouches: [{ clientX: 200 }],
    })
    fireEvent.touchMove(imageContainer, {
      targetTouches: [{ clientX: 175 }],
    })
    fireEvent.touchEnd(imageContainer)

    const selectedImage = screen.getByAltText('Выбранное изображение')
    expect(selectedImage).toHaveAttribute(
      'src',
      expect.stringContaining('image1.jpg'),
    )
  })
})
