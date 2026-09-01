import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'

import { MobileSubMenu } from './MobileSubMenu'

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
        onNavigate={() => null}
      />,
    )

    expect(screen.getByText('Что такое АА?')).toBeInTheDocument()
    expect(screen.getByText('Что такое МА?')).toBeInTheDocument()
    expect(screen.getByText('История АА')).toBeInTheDocument()
    expect(screen.getByText('Назад')).toBeInTheDocument()
  })

  it('slides in and out of view with isActive', () => {
    // The transform is the only thing that opens or closes this menu; it stays
    // mounted either way.
    const { container, rerender } = render(
      <MobileSubMenu
        isActive={true}
        activeItems={mockActiveItems}
        toggleSelect={() => null}
        onNavigate={() => null}
      />,
    )

    expect(container.firstChild).toHaveClass('translate-x-0')

    rerender(
      <MobileSubMenu
        isActive={false}
        activeItems={mockActiveItems}
        toggleSelect={() => null}
        onNavigate={() => null}
      />,
    )

    expect(container.firstChild).toHaveClass('translate-x-full')
  })

  it('calls toggleSelect when back button is clicked', () => {
    const mockToggleSelect = jest.fn()

    render(
      <MobileSubMenu
        isActive={true}
        activeItems={mockActiveItems}
        toggleSelect={mockToggleSelect}
        onNavigate={() => null}
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
        onNavigate={() => null}
      />,
    )

    const firstLink = screen.getByText('Что такое АА?').closest('a')
    const secondLink = screen.getByText('Что такое МА?').closest('a')
    const thirdLink = screen.getByText('История АА').closest('a')

    expect(firstLink).toHaveAttribute('href', '/aa')
    expect(secondLink).toHaveAttribute('href', '/ma')
    expect(thirdLink).toHaveAttribute('href', '/history')
  })

  it('calls onNavigate with the item href when a link is clicked', () => {
    const mockOnNavigate = jest.fn()

    render(
      <MobileSubMenu
        isActive={true}
        activeItems={mockActiveItems}
        toggleSelect={() => null}
        onNavigate={mockOnNavigate}
      />,
    )

    fireEvent.click(screen.getByText('Что такое МА?'))
    expect(mockOnNavigate).toHaveBeenCalledWith('/ma')
  })

  it('renders empty menu when activeItems is empty', () => {
    render(
      <MobileSubMenu
        isActive={true}
        activeItems={[]}
        toggleSelect={() => null}
        onNavigate={() => null}
      />,
    )

    // Only the back button should be present
    expect(screen.getByText('Назад')).toBeInTheDocument()
    expect(screen.queryByText('Что такое АА?')).not.toBeInTheDocument()
  })
})
