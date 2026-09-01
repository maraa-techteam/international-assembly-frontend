import { render, screen } from '@testing-library/react'

import GroupsTableItem from './GroupTableItem'

const mockGroup = {
  id: '1',
  name: 'Тестовая группа',
  country: 'Россия',
  presence: 'Онлайн',
  description: 'Описание группы',
  digital_address: 'zoom.us/j/123',
  address: '',
  website: '',
  youtube: '',
  telegram: '',
  contact: [],
  schedule_slots: [{ day: 'Понедельник', time: '19:00' }],
  time_zone: 'Европа/Лондон (UTC+0/+1)' as const,
  slug: 'test-group',
}

describe('GroupsTableItem', () => {
  it('renders the group name, country and presence', () => {
    render(<GroupsTableItem group={mockGroup} />)

    expect(screen.getByText('Тестовая группа')).toBeInTheDocument()
    expect(screen.getByText('Россия')).toBeInTheDocument()
    expect(screen.getByText('Онлайн')).toBeInTheDocument()
  })

  it('links to the group detail page', () => {
    render(<GroupsTableItem group={mockGroup} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/groups/test-group')
  })
})
