import { MobileSubMenu } from '@/ui/components'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'

const mockActiveItems = [
  {
    name: 'Что такое АА?',
    href: '/aa',
    description: 'Описание страницы Что такое АА?',
    isActive: false,
    isFrequentlyVisited: true,
  },
  {
    name: 'Что такое МА?',
    href: '/ma',
    description: 'Описание страницы Что такое МА?',
    isActive: true,
    isFrequentlyVisited: true,
  },
  {
    name: 'История АА',
    href: '/history',
    description: 'Описание истории АА',
    isActive: false,
    isFrequentlyVisited: false,
  },
]

describe('MobileSubMenu component', () => {
  it('renders all menu items correctly', () => {
    render(
      <MobileSubMenu
        isActive={true}
        activeItems={mockActiveItems}
        toggleSelect={() => null}
      />,
    )

    expect(screen.getByText('Что такое АА?')).toBeInTheDocument()
    expect(screen.getByText('Что такое МА?')).toBeInTheDocument()
    expect(screen.getByText('История АА')).toBeInTheDocument()
    expect(screen.getByText('Назад')).toBeInTheDocument()
  })

  it('applies correct transform class when active', () => {
    const { container } = render(
      <MobileSubMenu
        isActive={true}
        activeItems={mockActiveItems}
        toggleSelect={() => null}
      />,
    )

    const menu = container.firstChild as HTMLElement
    expect(menu).toHaveClass('translate-x-[0]')
    expect(menu).not.toHaveClass('translate-x-full')
  })

  it('applies correct transform class when inactive', () => {
    const { container } = render(
      <MobileSubMenu
        isActive={false}
        activeItems={mockActiveItems}
        toggleSelect={() => null}
      />,
    )

    const menu = container.firstChild as HTMLElement
    expect(menu).toHaveClass('translate-x-full')
    expect(menu).not.toHaveClass('translate-x-[0]')
  })

  it('calls toggleSelect when back button is clicked', () => {
    const mockToggleSelect = jest.fn()

    render(
      <MobileSubMenu
        isActive={true}
        activeItems={mockActiveItems}
        toggleSelect={mockToggleSelect}
      />,
    )

    const backButton = screen.getByText('Назад')
    fireEvent.click(backButton)

    expect(mockToggleSelect).toHaveBeenCalledTimes(1)
  })

  it('renders correct href attributes for links', () => {
    render(
      <MobileSubMenu
        isActive={true}
        activeItems={mockActiveItems}
        toggleSelect={() => null}
      />,
    )

    const firstLink = screen.getByText('Что такое АА?').closest('a')
    const secondLink = screen.getByText('Что такое МА?').closest('a')
    const thirdLink = screen.getByText('История АА').closest('a')

    expect(firstLink).toHaveAttribute('href', '/aa')
    expect(secondLink).toHaveAttribute('href', '/ma')
    expect(thirdLink).toHaveAttribute('href', '/history')
  })

  it('renders chevron icons for all menu items', () => {
    const { container } = render(
      <MobileSubMenu
        isActive={true}
        activeItems={mockActiveItems}
        toggleSelect={() => null}
      />,
    )

    // There should be chevron-right icons for each menu item (3) plus arrow-left for back button
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThanOrEqual(4) // at least 4 icons (1 back arrow + 3 chevrons)
  })

  it('renders empty menu when activeItems is empty', () => {
    render(
      <MobileSubMenu
        isActive={true}
        activeItems={[]}
        toggleSelect={() => null}
      />,
    )

    // Only the back button should be present
    expect(screen.getByText('Назад')).toBeInTheDocument()
    expect(screen.queryByText('Что такое АА?')).not.toBeInTheDocument()
  })
})
