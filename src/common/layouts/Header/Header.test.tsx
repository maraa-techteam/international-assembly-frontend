import { render, screen } from '@testing-library/react'

import { Header } from './Header'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}))

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
  // it('renders navigation items', () => {
  //   render(<Header headerData={mockHeaderData} />)

  //   const navItems = screen.getByRole('menubar')
  //   expect(navItems).toBeInTheDocument()
  // })

  it('renders logo', () => {
    render(<Header headerData={mockHeaderData} />)

    const logo = screen.getByAltText('Логотип АА')
    expect(logo).toBeInTheDocument()
  })

  // it('renders search bar with placeholder', () => {
  //   render(<Header headerData={mockHeaderData} />)

  //   const searchBar = screen.getByRole('search')
  //   expect(searchBar).toBeInTheDocument()
  // })

  it('renders mobile menu toggler only on mobile', () => {
    render(<Header headerData={mockHeaderData} />)

    const mobileToggler = screen.getByLabelText('Открыть мобильное меню')
    expect(mobileToggler).toBeInTheDocument()
    expect(mobileToggler).toHaveClass('block')
    expect(mobileToggler).toHaveClass('lg:hidden')
  })
})
