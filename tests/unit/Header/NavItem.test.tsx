import { NavItem } from '@/ui/components'
import { fireEvent, render, screen } from '@testing-library/react'

describe('NavItem', () => {
  const mockToggleSelect = jest.fn()

  it('renders the nav item name', () => {
    render(
      <NavItem
        name='Test Nav'
        href='/test'
        toggleSelect={mockToggleSelect}
        isActive={false}
        subNav={[]}
      />,
    )

    expect(screen.getByText('Test Nav')).toBeInTheDocument()
  })

  it('applies scale-[-1] class to chevron when isActive is true', () => {
    render(
      <NavItem
        name='Test Nav'
        href='/test'
        toggleSelect={mockToggleSelect}
        isActive={true}
        subNav={[
          {
            name: 'Sub',
            href: '/sub',
            description: 'Desc',
            isFrequentlyVisited: false,
          },
        ]}
      />,
    )

    const chevronDown = screen.getAllByTestId('icon')[0]
    expect(chevronDown).toHaveClass('scale-[-1]')
  })

  it('does not apply scale-[-1] class when isActive is false', () => {
    render(
      <NavItem
        name='Test Nav'
        href='/test'
        toggleSelect={mockToggleSelect}
        isActive={false}
        subNav={[
          {
            name: 'Sub',
            href: '/sub',
            description: 'Desc',
            isFrequentlyVisited: false,
          },
        ]}
      />,
    )

    const chevronDown = screen.getAllByTestId('icon')[0]
    expect(chevronDown).not.toHaveClass('scale-[-1]')
  })

  it('calls toggleSelect when clicked', () => {
    render(
      <NavItem
        name='Test Nav'
        href='/test'
        toggleSelect={mockToggleSelect}
        isActive={false}
        subNav={[]}
      />,
    )

    fireEvent.click(screen.getByRole('menuitem'))
    expect(mockToggleSelect).toHaveBeenCalledTimes(1)
  })
})
