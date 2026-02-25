import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Gallery } from './Gallery'
import { ImageType } from './Gallery.type'

jest.mock('@/common/utils/getImageUrl', () => ({
  getImageUrl: (src: string) => `https://example.com/${src}`,
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

jest.mock('@/common/hooks/useEscapeClose', () => ({
  useEscapeClose: jest.fn(),
}))

jest.mock('@/common/components', () => ({
  Icon: () => <div />,
  Typography: ({ children }: any) => <div>{children}</div>,
}))

jest.mock('@/common/layouts', () => ({
  Grid: ({ children }: any) => <ul>{children}</ul>,
}))

const mockImages: ImageType[] = [
  { id: '1', directus_files_id: 'image1.jpg' },
  { id: '2', directus_files_id: 'image2.jpg' },
  { id: '3', directus_files_id: 'image3.jpg' },
]

describe('Gallery', () => {
  it('renders gallery thumbnails', () => {
    render(<Gallery images={mockImages} />)
    expect(screen.getByAltText('Image 1')).toBeInTheDocument()
    expect(screen.getByAltText('Image 2')).toBeInTheDocument()
  })

  it('opens modal when clicking a thumbnail', async () => {
    render(<Gallery images={mockImages} />)
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  it('closes modal when clicking close button', async () => {
    render(<Gallery images={mockImages} />)
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    const closeButton = screen.getByLabelText('Закрыть просмотр изображений')
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('navigates to next image', async () => {
    render(<Gallery images={mockImages} />)
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    const nextButton = screen.getByLabelText('Следующее изображение')
    fireEvent.click(nextButton)

    await waitFor(() => {
      const img = screen.getByAltText('Выбранное изображение')
      expect(img).toHaveAttribute('src', expect.stringContaining('image2.jpg'))
    })
  })
})
