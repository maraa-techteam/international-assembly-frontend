import { SecondTierNavigationType } from '@/types/navigation'
import { ContentGuide } from '@/ui/components'
import { fireEvent, render, screen } from '@testing-library/react'

const mockData: SecondTierNavigationType[] = [
  {
    name: 'Раздел 1',
    href: '/section-1',
    description: 'Описание первого раздела',
    isFrequentlyVisited: true,
  },
  {
    name: 'Раздел 2',
    href: '/section-2',
    description: 'Описание второго раздела',
    isFrequentlyVisited: true,
  },
  {
    name: 'Раздел 3',
    href: '/section-3',
    description: 'Описание третьего раздела',
    isFrequentlyVisited: true,
  },
]

describe('ContentGuide component', () => {
  it('renders all navigation buttons', () => {
    render(<ContentGuide data={mockData} />)

    expect(screen.getByText('Раздел 1')).toBeInTheDocument()
    expect(screen.getByText('Раздел 2')).toBeInTheDocument()
    expect(screen.getByText('Раздел 3')).toBeInTheDocument()
  })

  it('first item is active by default', () => {
    render(<ContentGuide data={mockData} />)

    expect(screen.getByText('Описание первого раздела')).toBeInTheDocument()
  })

  it('displays description of the first active item', () => {
    render(<ContentGuide data={mockData} />)

    expect(screen.getByText('Описание первого раздела')).toBeInTheDocument()
  })

  it('does not display descriptions of inactive items', () => {
    render(<ContentGuide data={mockData} />)

    expect(
      screen.queryByText('Описание второго раздела'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Описание третьего раздела'),
    ).not.toBeInTheDocument()
  })

  it('changes active item when button is clicked', () => {
    render(<ContentGuide data={mockData} />)

    const secondButton = screen.getByText('Раздел 2')
    fireEvent.click(secondButton)

    expect(screen.getByText('Описание второго раздела')).toBeInTheDocument()
    expect(
      screen.queryByText('Описание первого раздела'),
    ).not.toBeInTheDocument()
  })

  it('updates button variants when active item changes', () => {
    render(<ContentGuide data={mockData} />)

    const secondButton = screen.getByText('Раздел 2')
    fireEvent.click(secondButton)

    expect(secondButton).toHaveClass('bg-white')
  })

  it('only one item can be active at a time', () => {
    render(<ContentGuide data={mockData} />)

    fireEvent.click(screen.getByText('Раздел 1'))
    fireEvent.click(screen.getByText('Раздел 2'))
    fireEvent.click(screen.getByText('Раздел 3'))

    expect(screen.getByText('Описание третьего раздела')).toBeInTheDocument()
    expect(
      screen.queryByText('Описание первого раздела'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Описание второго раздела'),
    ).not.toBeInTheDocument()
  })

  it('renders link component for active item', () => {
    render(<ContentGuide data={mockData} />)

    const link = screen.getByText('Подробнее')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders only one link at a time', () => {
    render(<ContentGuide data={mockData} />)

    const links = screen.getAllByText('Подробнее')
    expect(links).toHaveLength(1)
  })

  it('handles empty data array', () => {
    const { container } = render(<ContentGuide data={[]} />)

    expect(container.querySelector('button')).not.toBeInTheDocument()
  })
})
