import { fireEvent, render, screen } from '@testing-library/react'

import { Footer } from './Footer'
import { FooterNavItemType } from './Footer.type'

const mockFooterData: FooterNavItemType[] = [
  {
    name: 'О нас',
    subNav: [
      {
        name: 'Что такое АА?',
        href: '/aa',
        description: 'Описание страницы Что такое АА?',
        isFrequentlyVisited: true,
      },
    ],
  },

  {
    name: 'Ресурсы',
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
  },
]

describe('Footer component', () => {
  it('renders correct number of navigation items', () => {
    render(<Footer footerData={mockFooterData} />)

    const nav = screen.getByRole('navigation', { name: 'Навигация' })
    const list = nav.querySelector('ul') as HTMLElement
    expect(list.children.length).toBe(mockFooterData.length)
  })

  it('renders socials', () => {
    render(<Footer footerData={mockFooterData} />)

    expect(screen.getByRole('link', { name: 'youtube' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'telegram' })).toBeInTheDocument()
  })

  it('renders copyright text with current year', () => {
    render(<Footer footerData={mockFooterData} />)

    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText((content) => content.includes(`© ${currentYear}`)),
    ).toBeInTheDocument()
  })

  it('toggles navigation item to active when clicked', () => {
    render(<Footer footerData={mockFooterData} />)

    const firstNavButton = screen.getAllByText('О нас')[0]
    fireEvent.click(firstNavButton)

    expect(screen.getAllByText('Что такое АА?')[0]).toBeInTheDocument()
  })
})
