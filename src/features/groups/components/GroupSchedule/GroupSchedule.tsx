import { Typography } from '@/common/components'
import { cn } from '@/common/utils/cn'

import { GroupScheduleType } from './GroupSchedule.type'

type GroupScheduleProps = GroupScheduleType

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

export function GroupSchedule({ schedule, time_zone }: GroupScheduleProps) {
  const normalizedSchedule = days.map((day) => {
    const slots = schedule.filter((s) => s.day === day)
    return {
      day,
      times: slots.map((s) => s.time),
    }
  })

  const removeSeconds = (time: string) => {
    const [hours, minutes] = time.split(':')
    return `${hours}:${minutes}`
  }

  return (
    <div className='flex flex-col justify-center gap-1 py-2'>
      <div className='flex justify-between'>
        {normalizedSchedule.map((slot) => {
          return (
            <div
              key={slot.day}
              className='flex flex-col items-center justify-center'
            >
              <Typography
                variant='caption'
                className={cn(
                  'text-xs',
                  slot.times.length === 0 && 'text-gray-600',
                )}
              >
                {getDay(slot.day)}
              </Typography>
              {slot.times.map((time, index) => (
                <Typography
                  key={`${slot.day}-${time}-${index}`}
                  variant='caption'
                  className='text-xs'
                >
                  {removeSeconds(time)}
                </Typography>
              ))}
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
