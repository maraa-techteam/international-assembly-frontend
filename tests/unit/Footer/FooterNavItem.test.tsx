import { FooterNavItem } from '@/ui/components'
import { render, screen } from '@testing-library/react'

const mockSubNav = [
  {
    name: 'История',
    href: '/about/history',
    description: 'Описание истории',
    isFrequentlyVisited: true,
  },
  {
    name: 'Команда',
    href: '/about/team',
    description: 'Описание команды',
    isFrequentlyVisited: false,
  },
]

describe('FooterNavItem component', () => {
  it('returns null when subNav is empty', () => {
    const { container } = render(
      <FooterNavItem
        name='Контакты'
        subNav={[]}
        isActive={false}
        toggleSelect={() => null}
      />,
    )

    expect(container.firstChild).toBeNull()
  })

  it('renders component when subNav has items', () => {
    render(
      <FooterNavItem
        name='О нас'
        subNav={mockSubNav}
        isActive={false}
        toggleSelect={() => null}
      />,
    )

    expect(screen.getByText('О нас')).toBeInTheDocument()
  })

  it('renders all subNav items', () => {
    render(
      <FooterNavItem
        name='О нас'
        subNav={mockSubNav}
        isActive={false}
        toggleSelect={() => null}
      />,
    )

    expect(screen.getByText('История')).toBeInTheDocument()
    expect(screen.getByText('Команда')).toBeInTheDocument()
  })

  it('applies rotation class to icon when isActive is true', () => {
    render(
      <FooterNavItem
        name='О нас'
        subNav={mockSubNav}
        isActive={true}
        toggleSelect={() => null}
      />,
    )

    const icon = screen.getByTestId('icon')
    expect(icon).toHaveClass('scale-[-1]')
  })

  it('does not apply rotation class to icon when isActive is false', () => {
    render(
      <FooterNavItem
        name='О нас'
        subNav={mockSubNav}
        isActive={false}
        toggleSelect={() => null}
      />,
    )

    const icon = screen.getByTestId('icon')
    expect(icon).not.toHaveClass('scale-[-1]')
  })

  it('hides nav when isActive is false', () => {
    const { container } = render(
      <FooterNavItem
        name='О нас'
        subNav={mockSubNav}
        isActive={false}
        toggleSelect={() => null}
      />,
    )

    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('hidden')
  })

  it('shows nav when isActive is true', () => {
    const { container } = render(
      <FooterNavItem
        name='О нас'
        subNav={mockSubNav}
        isActive={true}
        toggleSelect={() => null}
      />,
    )

    const nav = container.querySelector('nav')
    expect(nav).not.toHaveClass('hidden')
  })
})
