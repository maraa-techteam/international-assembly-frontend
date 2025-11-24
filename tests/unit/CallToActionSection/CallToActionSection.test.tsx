import { CallToActionSectionProps } from '@/types/sections'
import { CallToActionSection } from '@/ui/sections'
import { render, screen } from '@testing-library/react'

const mockProps: CallToActionSectionProps = {
  title: 'Присоединяйтесь к нам',
  text: 'Начните свой путь к выздоровлению сегодня',
  linkText: 'Узнать больше',
  linkHref: '/about',
  linkIcon: 'arrow-right',
  actions: [
    {
      label: 'Связаться',
      size: 'lg',
      color: 'primary',
      href: '/contact',
      variant: 'contained',
    },
    {
      label: 'Подробнее',
      size: 'sm',
      color: 'white',
      href: '/info',
      variant: 'outlined',
    },
  ],
  image: ' /test-image.jpg',
}

describe('CallToActionSection component', () => {
  it('renders title and text', () => {
    render(<CallToActionSection {...mockProps} />)

    expect(screen.getByText('Присоединяйтесь к нам')).toBeInTheDocument()
    expect(
      screen.getByText('Начните свой путь к выздоровлению сегодня'),
    ).toBeInTheDocument()
  })

  it('renders link with correct text and href', () => {
    render(<CallToActionSection {...mockProps} />)

    const link = screen.getByText('Узнать больше')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
  })

  it('renders all action buttons', () => {
    render(<CallToActionSection {...mockProps} />)

    expect(screen.getByText('Связаться')).toBeInTheDocument()
    expect(screen.getByText('Подробнее')).toBeInTheDocument()
  })

  it('renders image when image prop is provided', () => {
    render(<CallToActionSection {...mockProps} />)

    const image = screen.getByAltText('Присоединяйтесь к нам')

    expect(image).toBeInTheDocument()
    const src = image.getAttribute('src')
    expect(src).toContain('test-image.jpg')
  })

  it('renders placeholder when image is not provided', () => {
    const propsWithoutImage = { ...mockProps, image: '' }
    render(<CallToActionSection {...propsWithoutImage} />)

    expect(screen.getByText('Картинка не найдена')).toBeInTheDocument()
  })
})
