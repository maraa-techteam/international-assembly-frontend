import { Header } from '@/ui/components'
import { render, screen } from '@testing-library/react'

const mockHeaderData = [
  {
    name: 'О нас',
    href: '/about',
    showInHeader: true,
    showInFooter: true,
    subNav: [],
    isActive: false,
  },
  {
    name: 'Контакты',
    href: '/contacts',
    showInHeader: true,
    showInFooter: true,
    subNav: [],
    isActive: false,
  },
]

describe('Header', () => {
  it('renders navigation items', () => {
    render(<Header headerData={mockHeaderData} />)

    const navItems = screen.getAllByRole('listitem')
    expect(navItems).toHaveLength(mockHeaderData.length)
  })

  it('renders logo', () => {
    render(<Header headerData={mockHeaderData} />)

    const logo = screen.getByAltText('Логотип АА')
    expect(logo).toBeInTheDocument()
  })

  it('renders search bar', () => {
    render(<Header headerData={mockHeaderData} />)

    const searchBar = screen.getByLabelText('Открыть строку поиска')
    expect(searchBar).toBeInTheDocument()
  })

  it('renders mobile menu toggler only on mobile', () => {
    render(<Header headerData={mockHeaderData} />)

    const mobileToggler = screen.getByLabelText('Открыть мобильное меню')
    expect(mobileToggler).toBeInTheDocument()
    expect(mobileToggler).toHaveClass('block')
    expect(mobileToggler).toHaveClass('lg:hidden')
  })
})
