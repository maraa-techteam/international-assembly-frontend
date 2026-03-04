import { fireEvent, render, screen } from '@testing-library/react'

import { Header } from './Header'

let mockPathname = '/'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => mockPathname,
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

beforeEach(() => {
  mockPathname = '/'
})

describe('Header', () => {
  it('renders navigation items', () => {
    render(<Header headerData={mockHeaderData} />)

    const navItems = screen.getAllByRole('menubar')[0]
    expect(navItems).toBeInTheDocument()
  })

  it('renders logo', () => {
    render(<Header headerData={mockHeaderData} />)

    const logo = screen.getByAltText('Логотип АА')
    expect(logo).toBeInTheDocument()
  })

  it('renders search bar with placeholder', () => {
    render(<Header headerData={mockHeaderData} />)

    const searchBar = screen.getAllByRole('search')[0]
    expect(searchBar).toBeInTheDocument()
  })

  it('renders mobile menu toggler only on mobile', () => {
    render(<Header headerData={mockHeaderData} />)

    const mobileToggler = screen.getByLabelText('Открыть мобильное меню')
    expect(mobileToggler).toBeInTheDocument()
    expect(mobileToggler).toHaveClass('block')
    expect(mobileToggler).toHaveClass('lg:hidden')
  })

  it('closes mobile menu instantly when pathname changes', () => {
    const { rerender } = render(<Header headerData={mockHeaderData} />)

    // Open mobile menu
    fireEvent.click(screen.getByLabelText('Открыть мобильное меню'))
    expect(screen.getByLabelText('Закрыть мобильное меню')).toBeInTheDocument()

    // Simulate route change
    mockPathname = '/about'
    rerender(<Header headerData={mockHeaderData} />)

    // Mobile menu should be closed
    expect(screen.getByLabelText('Открыть мобильное меню')).toBeInTheDocument()
  })

  it('mobile menu has no transition class when closing via navigation', () => {
    const { rerender, container } = render(
      <Header headerData={mockHeaderData} />,
    )

    // Open mobile menu
    fireEvent.click(screen.getByLabelText('Открыть мобильное меню'))

    // Simulate clicking a nav link (handleMobileNavigation sets isNavigating=true)
    const mobileMenu = container.querySelector('#mobile-menu') as HTMLElement
    const navLink = mobileMenu.querySelector(
      'a[role="menuitem"]',
    ) as HTMLElement
    fireEvent.click(navLink)

    // Mobile menu should not have transition class (instant close)
    expect(mobileMenu).not.toHaveClass('transition-transform')
    expect(mobileMenu).not.toHaveClass('duration-300')
  })
})
