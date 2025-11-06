import { NavItem } from '@/ui/components'
import { fireEvent, render, screen } from '@testing-library/react'

const mockSubNav = [
  {
    name: 'Что такое АА?',
    href: '/aa',
    description: 'Описание страницы Что такое АА?',
    isFrequentlyVisited: true,
  },
  {
    name: 'Что такое МА?',
    href: '/ma',
    description: 'Описание страницы Что такое МА?',
    isFrequentlyVisited: true,
  },
  {
    name: 'История АА',
    href: '/history',
    description: 'Описание истории АА',
    isFrequentlyVisited: false,
  },
]

describe('NavItem component', () => {
  describe('Simple navigation item (without submenu)', () => {
    it('renders as a simple link when subNav is empty', () => {
      render(
        <NavItem
          name='О нас'
          href='/about'
          subNav={[]}
          toggleSelect={() => null}
          isActive={false}
        />,
      )

      const link = screen.getByText('О нас').closest('a')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/about')
    })

    it('does not render submenu components when subNav is empty', () => {
      render(
        <NavItem
          name='О нас'
          href='/about'
          subNav={[]}
          toggleSelect={() => null}
          isActive={false}
        />,
      )

      expect(screen.queryByText('Назад')).not.toBeInTheDocument()
    })
  })

  describe('Navigation item with submenu', () => {
    it('renders as a button when subNav has items', () => {
      render(
        <NavItem
          name='Информация'
          href='/info'
          subNav={mockSubNav}
          toggleSelect={() => null}
          isActive={false}
        />,
      )

      const button = screen.getByText('Информация').closest('button')
      expect(button).toBeInTheDocument()
    })

    it('calls toggleSelect when button is clicked', () => {
      const mockToggleSelect = jest.fn()

      render(
        <NavItem
          name='Информация'
          href='/info'
          subNav={mockSubNav}
          toggleSelect={mockToggleSelect}
          isActive={false}
        />,
      )

      const button = screen.getByText('Информация')
      fireEvent.click(button)

      expect(mockToggleSelect).toHaveBeenCalledTimes(1)
    })

    it('renders MobileSubMenu component', () => {
      render(
        <NavItem
          name='Информация'
          href='/info'
          subNav={mockSubNav}
          toggleSelect={() => null}
          isActive={true}
        />,
      )

      // MobileSubMenu contains "Назад" button
      expect(screen.getByText('Назад')).toBeInTheDocument()
    })

    it('renders Sub Menu when isActive is true', () => {
      render(
        <NavItem
          name='Информация'
          href='/info'
          subNav={mockSubNav}
          toggleSelect={() => null}
          isActive={true}
        />,
      )

      // Sub Menu should render the first item as active by default
      expect(screen.getAllByText('Что такое АА?')[0]).toBeInTheDocument()
      expect(
        screen.getByText('Описание страницы Что такое АА?'),
      ).toBeInTheDocument()
    })

    it('does not render Sub Menu when isActive is false', () => {
      render(
        <NavItem
          name='Информация'
          href='/info'
          subNav={mockSubNav}
          toggleSelect={() => null}
          isActive={false}
        />,
      )

      // Description should not be present when inactive
      expect(
        screen.queryByText('Описание страницы Что такое АА?'),
      ).not.toBeInTheDocument()
    })

    it('initializes first submenu item as active', () => {
      render(
        <NavItem
          name='Информация'
          href='/info'
          subNav={mockSubNav}
          toggleSelect={() => null}
          isActive={true}
        />,
      )

      // First item should be active (its description should be visible)
      expect(
        screen.getByText('Описание страницы Что такое АА?'),
      ).toBeInTheDocument()
      expect(
        screen.queryByText('Описание страницы Что такое МА?'),
      ).not.toBeInTheDocument()
    })

    it('applies correct icon rotation when isActive is true', () => {
      render(
        <NavItem
          name='Информация'
          href='/info'
          subNav={mockSubNav}
          toggleSelect={() => null}
          isActive={true}
        />,
      )

      // The chevron-down icon should have scale-[-1] class when active
      const button = screen.getByText('Информация').closest('button')
      const chevronDown = button?.querySelector('svg')

      expect(chevronDown?.parentElement).toHaveClass('scale-[-1]')
    })

    it('does not apply icon rotation when isActive is false', () => {
      render(
        <NavItem
          name='Информация'
          href='/info'
          subNav={mockSubNav}
          toggleSelect={() => null}
          isActive={false}
        />,
      )

      const button = screen.getByText('Информация').closest('button')
      const chevronDown = button?.querySelector('svg')

      expect(chevronDown?.parentElement).not.toHaveClass('scale-[-1]')
    })
  })
})
