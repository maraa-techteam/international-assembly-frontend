import { Header } from '@/ui/components'
import { fireEvent, render, screen } from '@testing-library/react'

const mockHeaderData = [
  {
    name: 'О нас',
    href: '/',
    showInHeader: true,
    showInFooter: true,
    subNav: [
      {
        name: 'Что такое АА?',
        href: '/',
        description: 'Описание страницы Что такое АА?',
        isFrequentlyVisited: true,
      },
    ],
    isActive: false,
  },
  {
    name: 'Новичкам',
    href: '/',
    showInHeader: true,
    showInFooter: true,
    subNav: [
      {
        name: 'Что такое АА?',
        href: '/',
        description: 'Описание страницы Что такое АА?',
        isFrequentlyVisited: true,
      },
    ],
    isActive: false,
  },
  {
    name: 'Новичкам',
    href: '/',
    showInHeader: true,
    showInFooter: true,
    subNav: [
      {
        name: 'Что такое АА?',
        href: '/',
        description: 'Описание страницы Что такое АА?',
        isFrequentlyVisited: true,
      },
    ],
    isActive: false,
  },
  {
    name: 'Группы АА',
    href: '/',
    showInHeader: true,
    showInFooter: true,
    subNav: [
      {
        name: 'Что такое АА?',
        href: '/',
        description: 'Описание страницы Что такое АА?',
        isFrequentlyVisited: true,
      },
    ],
    isActive: false,
  },
  {
    name: 'Литература',
    href: '/',
    showInHeader: true,
    showInFooter: false,
    subNav: [],
    isActive: false,
  },
  {
    name: 'Служения',
    href: '/',
    showInHeader: true,
    showInFooter: false,
    subNav: [],
    isActive: false,
  },
]
describe('Header', () => {
  it('renders nav items inside', () => {
    render(<Header headerData={mockHeaderData} />)

    const navItems = screen.getAllByRole('listitem')
    navItems.forEach((item) => {
      expect(item).toBeInTheDocument()
    })
  })
  it('renders logo', () => {
    render(<Header headerData={mockHeaderData} />)

    const logo = screen.getByAltText('logo')
    expect(logo).toBeInTheDocument()
  })
  it('renders search bar', () => {
    render(<Header headerData={mockHeaderData} />)

    const searchBar = screen.getByLabelText('open-search')
    expect(searchBar).toBeInTheDocument()
  })
  it('shows hamburger menu on mobile', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 768px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    render(<Header headerData={mockHeaderData} />)

    expect(screen.getByLabelText('open-mobile-menu')).toBeInTheDocument()
  })

  it('should disappear on scroll down and appear on scroll up', () => {
    render(<Header headerData={mockHeaderData} />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('lg:translate-y-0')
    fireEvent.scroll(window, { target: { scrollY: 100 } })
    expect(header).toHaveClass('lg:-translate-y-full')
    fireEvent.scroll(window, { target: { scrollY: 50 } })
    expect(header).toHaveClass('lg:translate-y-0')
  })
})
