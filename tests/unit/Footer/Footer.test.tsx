import { Socials } from '@/types/navigation'
import { TransformedNavigationType } from '@/types/navigation'
import { Footer } from '@/ui/components'
import { fireEvent, render, screen } from '@testing-library/react'

const mockFooterData: TransformedNavigationType[] = [
  {
    name: 'О нас',
    href: '/about',
    subNav: [
      {
        name: 'Что такое АА?',
        href: '/aa',
        description: 'Описание страницы Что такое АА?',
        isFrequentlyVisited: true,
      },
    ],
    isActive: false,
    showInFooter: true,
    showInHeader: true,
  },
  {
    name: 'Ресурсы',
    href: '/resources',
    subNav: [
      {
        name: 'Что такое МА?',
        href: '/ma',
        description: 'Описание страницы Что такое МА?',
        isFrequentlyVisited: true,
      },
      {
        name: 'История АА',
        href: '/history',
        description: 'Описание истории АА',
        isFrequentlyVisited: false,
      },
    ],
    isActive: false,
    showInFooter: true,
    showInHeader: true,
  },
]

const mockSocials: Socials[] = [
  { name: 'telegram', icon: 'telegram', href: 'https://facebook.com/test' },
  { name: 'youtube', icon: 'youtube', href: 'https://twitter.com/test' },
]

describe('Footer component', () => {
  it('renders correct number of navigation items', () => {
    render(<Footer footerData={mockFooterData} socials={mockSocials} />)

    const navItems = screen.getAllByRole('listitem')
    expect(navItems).toHaveLength(2)
  })

  it('renders copyright text with current year', () => {
    render(<Footer footerData={mockFooterData} socials={mockSocials} />)

    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText((content) => content.includes(`© ${currentYear}`)),
    ).toBeInTheDocument()
  })

  it('toggles navigation item to active when clicked', () => {
    render(<Footer footerData={mockFooterData} socials={mockSocials} />)

    const firstNavButton = screen.getByText('О нас')
    fireEvent.click(firstNavButton)

    expect(screen.getByText('Что такое АА?')).toBeInTheDocument()
  })
})
