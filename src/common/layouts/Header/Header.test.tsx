import { fireEvent, render, screen } from '@testing-library/react'

import { Header } from './Header'

let mockPathname = '/'
const mockRouterPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
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
  mockRouterPush.mockClear()
})

describe('Header', () => {
  it('renders navigation items', () => {
    render(<Header headerData={mockHeaderData} />)

    const nav = screen.getByRole('navigation', { name: 'Основная навигация' })
    expect(nav).toBeInTheDocument()
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

  it('closes mobile menu when pathname changes', () => {
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

  it('mobile menu always has transition class (animation plays on close)', () => {
    const { container } = render(<Header headerData={mockHeaderData} />)

    const mobileMenu = container.querySelector('#mobile-menu') as HTMLElement
    expect(mobileMenu).toHaveClass('transition-transform')
    expect(mobileMenu).toHaveClass('duration-300')
  })

  it('calls router.push immediately and menu stays open when nav link is clicked', () => {
    const { container } = render(<Header headerData={mockHeaderData} />)

    // Open mobile menu
    fireEvent.click(screen.getByLabelText('Открыть мобильное меню'))

    const mobileMenu = container.querySelector('#mobile-menu') as HTMLElement
    const navLink = mobileMenu.querySelector('a') as HTMLElement
    fireEvent.click(navLink)

    // router.push should be called immediately
    expect(mockRouterPush).toHaveBeenCalledWith('/about')

    // Menu should still be open while navigation is in progress
    expect(screen.getByLabelText('Закрыть мобильное меню')).toBeInTheDocument()
  })

  it('closes menu after pathname changes following navigation', () => {
    const { container, rerender } = render(
      <Header headerData={mockHeaderData} />,
    )

    // Open mobile menu
    fireEvent.click(screen.getByLabelText('Открыть мобильное меню'))

    const mobileMenu = container.querySelector('#mobile-menu') as HTMLElement
    const navLink = mobileMenu.querySelector('a') as HTMLElement
    fireEvent.click(navLink)

    // router.push called immediately
    expect(mockRouterPush).toHaveBeenCalledWith('/about')

    // Simulate the route completing (pathname changes)
    mockPathname = '/about'
    rerender(<Header headerData={mockHeaderData} />)

    // Now the menu should be closed
    expect(screen.getByLabelText('Открыть мобильное меню')).toBeInTheDocument()
  })
})
