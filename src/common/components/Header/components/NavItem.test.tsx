import { fireEvent, render, screen } from '@testing-library/react'

import { NavItem } from './NavItem'

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

  it('calls toggleSelect when clicked', () => {
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

    fireEvent.click(screen.getByRole('button'))
    expect(mockToggleSelect).toHaveBeenCalledTimes(1)
  })

  it('opens page when clicked', () => {
    render(
      <NavItem
        name='Test Nav'
        href='/test'
        toggleSelect={mockToggleSelect}
        isActive={false}
        subNav={[]}
      />,
    )
    const element = screen.getByRole('link', { name: 'Test Nav' })
    fireEvent.click(element)
    expect(element).toHaveAttribute('href', '/test')
  })
})
