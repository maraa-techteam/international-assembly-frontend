import { DesktopSubMenu } from '@/ui/components'
import { fireEvent, render, screen } from '@testing-library/react'

const mockNavigationData = [
  {
    name: 'Item 1',
    href: '/item-1',
    description: 'Description for item 1',
    isFrequentlyVisited: true,
  },
  {
    name: 'Item 2',
    href: '/item-2',
    description: 'Description for item 2',
    isFrequentlyVisited: false,
  },
  {
    name: 'Item 3',
    href: '/item-3',
    description: 'Description for item 3',
    isFrequentlyVisited: false,
  },
]

describe('DesktopSubMenu', () => {
  it('renders all navigation items', () => {
    render(<DesktopSubMenu navigationData={mockNavigationData} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('displays first item description by default', () => {
    render(<DesktopSubMenu navigationData={mockNavigationData} />)

    expect(screen.getByText('Description for item 1')).toBeInTheDocument()
  })

  it('changes active item on mouse enter', () => {
    render(<DesktopSubMenu navigationData={mockNavigationData} />)

    const item2Link = screen.getByText('Item 2').closest('a')

    fireEvent.mouseEnter(item2Link!)

    expect(screen.getByText('Description for item 2')).toBeInTheDocument()
    expect(screen.queryByText('Description for item 1')).not.toBeInTheDocument()
  })

  it('applies active styles to first item by default', () => {
    render(<DesktopSubMenu navigationData={mockNavigationData} />)

    const item1Link = screen.getByText('Item 1').closest('a')

    expect(item1Link).toHaveClass('bg-primary', 'text-white')
  })
})
