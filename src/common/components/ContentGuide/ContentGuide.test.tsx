import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ContentGuide } from './ContentGuide'

const mockData = [
  {
    name: 'Первый раздел',
    href: '/section-1',
    description: 'Описание первого раздела',
    isFrequentlyVisited: false,
  },
  {
    name: 'Второй раздел',
    href: '/section-2',
    description: 'Описание второго раздела',
    isFrequentlyVisited: false,
  },
]

describe('ContentGuide', () => {
  it('shows description of the first item by default', () => {
    render(<ContentGuide data={mockData} />)

    expect(screen.getByText('Описание первого раздела')).toBeInTheDocument()
    expect(
      screen.queryByText('Описание второго раздела'),
    ).not.toBeInTheDocument()
  })

  it('switches active item when a button is clicked', async () => {
    const user = userEvent.setup()
    render(<ContentGuide data={mockData} />)

    await user.click(screen.getByRole('button', { name: 'Второй раздел' }))

    expect(screen.getByText('Описание второго раздела')).toBeInTheDocument()
    expect(
      screen.queryByText('Описание первого раздела'),
    ).not.toBeInTheDocument()
  })
})
