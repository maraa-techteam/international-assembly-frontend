import { render, screen } from '@testing-library/react'

import { GroupSchedule } from './GroupSchedule'

describe('GroupSchedule', () => {
  it('renders all seven days and the time zone even with an empty schedule', () => {
    render(<GroupSchedule schedule={[]} time_zone='Европа/Лондон (UTC+0/+1)' />)

    expect(screen.getByText('Пн')).toBeInTheDocument()
    expect(screen.getByText('Вт')).toBeInTheDocument()
    expect(screen.getByText('Ср')).toBeInTheDocument()
    expect(screen.getByText('Чт')).toBeInTheDocument()
    expect(screen.getByText('Пт')).toBeInTheDocument()
    expect(screen.getByText('Сб')).toBeInTheDocument()
    expect(screen.getByText('Вс')).toBeInTheDocument()
    expect(screen.getByText('Европа/Лондон (UTC+0/+1)')).toBeInTheDocument()
  })

  it('truncates seconds and renders multiple times for the same day', () => {
    render(
      <GroupSchedule
        schedule={[
          { day: 'Вторник', time: '09:36:00' },
          { day: 'Вторник', time: '16:52:00' },
        ]}
        time_zone='Европа/Лондон (UTC+0/+1)'
      />,
    )

    expect(screen.getByText('09:36')).toBeInTheDocument()
    expect(screen.getByText('16:52')).toBeInTheDocument()
  })
})
