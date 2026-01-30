import { cn } from '@/lib/utils/cn'
import { Typography } from '@/ui/components'

import { TimeZones } from './GroupTableItem'

export type WeekSchedule = { day: string; time: string }[]

type GroupScheduleProps = { schedule: WeekSchedule; time_zone: TimeZones }

const getDay = (day: string) => {
  switch (day) {
    case 'Понедельник':
      return 'Пн'
    case 'Вторник':
      return 'Вт'
    case 'Среда':
      return 'Ср'
    case 'Четверг':
      return 'Чт'
    case 'Пятница':
      return 'Пт'
    case 'Суббота':
      return 'Сб'
    case 'Воскресенье':
      return 'Вс'
    default:
      return day
  }
}

const days = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
]

export default function GroupSchedule({
  schedule,
  time_zone,
}: GroupScheduleProps) {
  const normalizedSchedule = days.map((day) => {
    const slot = schedule.find((s) => s.day === day)
    return {
      day,
      time: slot ? slot.time : '',
    }
  })

  return (
    <div className='flex flex-col justify-center gap-1 py-2'>
      <div className='grid grid-cols-7'>
        {normalizedSchedule.map((slot) => {
          return (
            <div
              key={slot.day}
              className='flex flex-col items-center justify-center'
            >
              <Typography
                variant='caption'
                className={cn('text-xs', !slot.time && 'text-gray-600')}
              >
                {getDay(slot.day)}
              </Typography>
              <Typography variant='caption' className='text-xs'>
                {slot.time}
              </Typography>
            </div>
          )
        })}
      </div>
      <Typography
        variant='caption'
        className='self-end text-right text-xs text-gray-600'
      >
        {time_zone}
      </Typography>
    </div>
  )
}
