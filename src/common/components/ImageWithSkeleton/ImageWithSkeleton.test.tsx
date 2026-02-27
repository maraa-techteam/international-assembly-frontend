import { fireEvent, render, screen } from '@testing-library/react'

import { ImageWithSkeleton } from './ImageWithSkeleton'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    onLoad,
    className,
  }: {
    src: string
    alt: string
    width?: number | `${number}`
    height?: number | `${number}`
    onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void
    className?: string
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onLoad={onLoad}
      className={className}
    />
  ),
}))

describe('ImageWithSkeleton', () => {
  it('renders an image with the given alt text', () => {
    render(
      <ImageWithSkeleton
        src='/test.jpg'
        alt='Test image'
        width={400}
        height={300}
      />,
    )

    expect(screen.getByAltText('Test image')).toBeInTheDocument()
  })

  it('shows skeleton (animate-pulse) before the image loads', () => {
    const { container } = render(
      <ImageWithSkeleton
        src='/test.jpg'
        alt='Test image'
        width={400}
        height={300}
      />,
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('animate-pulse')
    expect(wrapper).toHaveClass('bg-gray-200')
  })

  it('hides skeleton after the image loads', () => {
    const { container } = render(
      <ImageWithSkeleton
        src='/test.jpg'
        alt='Test image'
        width={400}
        height={300}
      />,
    )

    const img = screen.getByAltText('Test image')
    fireEvent.load(img)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).not.toHaveClass('animate-pulse')
  })

  it('image starts with opacity-0 and becomes opacity-100 after load', () => {
    render(
      <ImageWithSkeleton
        src='/test.jpg'
        alt='Test image'
        width={400}
        height={300}
      />,
    )

    const img = screen.getByAltText('Test image')
    expect(img).toHaveClass('opacity-0')

    fireEvent.load(img)
    expect(img).toHaveClass('opacity-100')
  })

  it('calls the onLoad callback when the image loads', () => {
    const handleLoad = jest.fn()
    render(
      <ImageWithSkeleton
        src='/test.jpg'
        alt='Test image'
        width={400}
        height={300}
        onLoad={handleLoad}
      />,
    )

    fireEvent.load(screen.getByAltText('Test image'))
    expect(handleLoad).toHaveBeenCalledTimes(1)
  })

  it('applies wrapperClassName to the wrapper element', () => {
    const { container } = render(
      <ImageWithSkeleton
        src='/test.jpg'
        alt='Test image'
        width={400}
        height={300}
        wrapperClassName='custom-wrapper'
      />,
    )

    expect(container.firstChild).toHaveClass('custom-wrapper')
  })

  it('applies className to the image element', () => {
    render(
      <ImageWithSkeleton
        src='/test.jpg'
        alt='Test image'
        width={400}
        height={300}
        className='object-cover'
      />,
    )

    expect(screen.getByAltText('Test image')).toHaveClass('object-cover')
  })
})
