import { FooterNavItemProps } from '@/types/components'
import { FooterNavItem } from '@/ui/components'
import { render, screen } from '@testing-library/react'

const mockProps: FooterNavItemProps = {
  name: 'Test Category',
  subNav: [
    {
      name: 'Link 1',
      href: '/link-1',
      description: 'Description 1',
      isFrequentlyVisited: true,
    },
    {
      name: 'Link 2',
      href: '/link-2',
      description: 'Description 2',
      isFrequentlyVisited: true,
    },
    {
      name: 'Link 3',
      href: '/link-3',
      description: 'Description 3',
      isFrequentlyVisited: true,
    },
  ],
}

describe('FooterNavItem', () => {
  it('desktop nav is always visible and cannot be toggled', () => {
    render(<FooterNavItem {...mockProps} />)

    // Desktop version uses regular ul (not details/summary)
    const desktopList = screen.getAllByRole('list')[0]
    expect(desktopList).toBeVisible()

    // Details element has lg:invisible lg:hidden classes
    const details = screen.getByRole('group')
    expect(details).toHaveClass('lg:invisible', 'lg:hidden')
  })

  it('links have correct href attributes', () => {
    render(<FooterNavItem {...mockProps} />)

    const links = screen.getAllByRole('link')

    // Should have 6 links total (3 in desktop view, 3 in mobile view)
    expect(links).toHaveLength(6)

    // Check hrefs
    expect(links[0]).toHaveAttribute('href', '/link-1')
    expect(links[1]).toHaveAttribute('href', '/link-2')
    expect(links[2]).toHaveAttribute('href', '/link-3')
  })
})
