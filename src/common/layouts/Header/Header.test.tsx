import { act, fireEvent, render, screen } from '@testing-library/react'

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
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
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

  it('closes menu immediately and calls router.push after transition timeout when nav link is clicked', () => {
    const { container } = render(<Header headerData={mockHeaderData} />)

    // Open mobile menu
    fireEvent.click(screen.getByLabelText('Открыть мобильное меню'))

    const mobileMenu = container.querySelector('#mobile-menu') as HTMLElement
    const navLink = mobileMenu.querySelector(
      'a[role="menuitem"]',
    ) as HTMLElement
    fireEvent.click(navLink)

    // Menu should start closing (isMobileMenuActive=false)
    expect(screen.getByLabelText('Открыть мобильное меню')).toBeInTheDocument()

    // router.push should NOT have been called yet (waiting for transition)
    expect(mockRouterPush).not.toHaveBeenCalled()

    // Advance past the 350ms fallback timeout
    act(() => {
      jest.advanceTimersByTime(350)
    })

    // Now router.push should be called with the link href
    expect(mockRouterPush).toHaveBeenCalledWith('/about')
  })

  it('calls router.push immediately via transitionend when nav link is clicked', () => {
    const { container } = render(<Header headerData={mockHeaderData} />)

    fireEvent.click(screen.getByLabelText('Открыть мобильное меню'))

    const mobileMenu = container.querySelector('#mobile-menu') as HTMLElement
    const navLink = mobileMenu.querySelector(
      'a[role="menuitem"]',
    ) as HTMLElement
    fireEvent.click(navLink)

    // Simulate the CSS transitionend event on the menu element
    act(() => {
      fireEvent.transitionEnd(mobileMenu)
    })

    expect(mockRouterPush).toHaveBeenCalledWith('/about')

    // Subsequent timeout should NOT navigate again (done guard)
    act(() => {
      jest.advanceTimersByTime(350)
    })
    expect(mockRouterPush).toHaveBeenCalledTimes(1)
  })
})
