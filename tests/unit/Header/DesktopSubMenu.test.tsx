import { DesktopSubMenu } from '@/ui/components'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'

const mockSubMenuData = [
  {
    name: 'Что такое АА?',
    href: '/',
    description: 'Описание страницы Что такое АА?',
    isFrequentlyVisited: true,
  },
  {
    name: 'Что такое МА?',
    href: '/',
    description: 'Описание страницы Что такое МА?',
    isFrequentlyVisited: true,
  },
]

const mockSubMenuActiveData = [
  {
    name: 'Что такое АА?',
    href: '/',
    description: 'Описание страницы Что такое АА?',
    isActive: true,
    isFrequentlyVisited: true,
  },
  {
    name: 'Что такое МА?',
    href: '/',
    description: 'Описание страницы Что такое МА?',
    isActive: false,
    isFrequentlyVisited: true,
  },
]

describe('DesktopSubMenu component', () => {
  it('renders items and descriptions correctly', () => {
    render(
      <DesktopSubMenu
        activeItems={mockSubMenuActiveData}
        subNav={mockSubMenuData}
        onMouseEnter={() => null}
      />,
    )

    // Both menu items should be in the document
    expect(screen.getByText('Что такое АА?')).toBeInTheDocument()
    expect(screen.getByText('Что такое МА?')).toBeInTheDocument()

    // Only the active item's description should be visible
    expect(
      screen.getByText('Описание страницы Что такое АА?'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Описание страницы Что такое МА?'),
    ).not.toBeInTheDocument()
  })

  it('calls onMouseEnter when hovering over menu item', () => {
    const mockOnMouseEnter = jest.fn()

    render(
      <DesktopSubMenu
        activeItems={mockSubMenuActiveData}
        subNav={mockSubMenuData}
        onMouseEnter={mockOnMouseEnter}
      />,
    )

    const menuItem = screen.getByText('Что такое МА?')
    fireEvent.mouseEnter(menuItem)

    expect(mockOnMouseEnter).toHaveBeenCalledWith(1)
  })
})
