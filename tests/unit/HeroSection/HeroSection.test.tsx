import { HeroSectionProps } from '@/types/sections'
import { HeroSection } from '@/ui/sections'
import { render, screen } from '@testing-library/react'

const mockProps: HeroSectionProps = {
  title: 'Добро пожаловать в АА',
  buttons: [
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
}

describe('HeroSection component', () => {
  it('renders title', () => {
    render(<HeroSection {...mockProps} />)

    expect(screen.getByText('Добро пожаловать в АА')).toBeInTheDocument()
  })

  it('renders all buttons', () => {
    render(<HeroSection {...mockProps} />)

    expect(screen.getByText('Связаться')).toBeInTheDocument()
    expect(screen.getByText('Подробнее')).toBeInTheDocument()
  })

  it('renders with empty buttons array', () => {
    const propsWithNoButtons = { ...mockProps, buttons: [] }
    const { container } = render(<HeroSection {...propsWithNoButtons} />)

    expect(screen.getByText('Добро пожаловать в АА')).toBeInTheDocument()
    expect(container.querySelector('a')).not.toBeInTheDocument()
  })
})
