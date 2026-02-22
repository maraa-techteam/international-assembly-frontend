import { render, screen } from '@testing-library/react'

import { GroupSchedule } from './GroupSchedule'

describe('GroupSchedule', () => {
  it('renders all seven day abbreviations', () => {
    render(<GroupSchedule schedule={[]} time_zone='Европа/Лондон (UTC+0/+1)' />)

    expect(screen.getByText('Пн')).toBeInTheDocument()
    expect(screen.getByText('Вт')).toBeInTheDocument()
    expect(screen.getByText('Ср')).toBeInTheDocument()
    expect(screen.getByText('Чт')).toBeInTheDocument()
    expect(screen.getByText('Пт')).toBeInTheDocument()
    expect(screen.getByText('Сб')).toBeInTheDocument()
    expect(screen.getByText('Вс')).toBeInTheDocument()
  })

  it('renders time for scheduled days', () => {
    render(
      <GroupSchedule
        schedule={[{ day: 'Понедельник', time: '19:00' }]}
        time_zone='Европа/Лондон (UTC+0/+1)'
      />,
    )

    expect(screen.getByText('19:00')).toBeInTheDocument()
  })

  it('renders the time zone', () => {
    render(<GroupSchedule schedule={[]} time_zone='Европа/Лондон (UTC+0/+1)' />)

    expect(screen.getByText('Европа/Лондон (UTC+0/+1)')).toBeInTheDocument()
  })
})
