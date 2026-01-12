import { cn } from '@/lib/utils/cn'
import { Typography } from '@/ui/components'

import { TimeZones } from './GroupTableItem'

export type WeekSchedule = {
  monday: { time: string }[]
  tuesday: { time: string }[]
  wednesday: { time: string }[]
  thursday: { time: string }[]
  friday: { time: string }[]
  saturday: { time: string }[]
  sunday: { time: string }[]
}[]

type GroupScheduleProps = { schedule: WeekSchedule } & { time_zone: TimeZones }

export default function GroupSchedule({
  schedule,
  time_zone,
}: GroupScheduleProps) {
  return (
    <div className='flex flex-col justify-center gap-1 py-2'>
      <div className='grid grid-cols-7'>
        <div className='flex flex-col items-center justify-center'>
          <Typography
            variant='caption'
            className={cn(
              'text-xs',
              !schedule?.[0]?.monday?.[0]?.time && 'text-gray-600',
            )}
          >
            Пн
          </Typography>
          <Typography variant='caption' className='text-xs'>
            {schedule?.[0]?.monday?.[0]?.time ?? ''}
          </Typography>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Typography
            variant='caption'
            className={cn(
              'text-xs',
              !schedule?.[0]?.tuesday?.[0]?.time && 'text-gray-600',
            )}
          >
            Вт
          </Typography>
          <Typography variant='caption' className='text-xs'>
            {schedule?.[0]?.tuesday?.[0]?.time ?? ''}
          </Typography>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Typography
            variant='caption'
            className={cn(
              'text-xs',
              !schedule?.[0]?.wednesday?.[0]?.time && 'text-gray-600',
            )}
          >
            Ср
          </Typography>
          <Typography variant='caption' className='text-xs'>
            {schedule?.[0]?.wednesday?.[0]?.time ?? ''}
          </Typography>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Typography
            variant='caption'
            className={cn(
              'text-xs',
              !schedule?.[0]?.thursday?.[0]?.time && 'text-gray-600',
            )}
          >
            Чт
          </Typography>
          <Typography variant='caption' className='text-xs'>
            {schedule?.[0]?.thursday?.[0]?.time ?? ''}
          </Typography>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Typography
            variant='caption'
            className={cn(
              'text-xs',
              !schedule?.[0]?.friday?.[0]?.time && 'text-gray-600',
            )}
          >
            Пт
          </Typography>
          <Typography variant='caption' className='text-xs'>
            {schedule?.[0]?.friday?.[0]?.time ?? ''}
          </Typography>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Typography
            variant='caption'
            className={cn(
              'text-xs',
              !schedule?.[0]?.saturday?.[0]?.time && 'text-gray-600',
            )}
          >
            Сб
          </Typography>
          <Typography variant='caption' className='text-xs'>
            {schedule?.[0]?.saturday?.[0]?.time ?? ''}
          </Typography>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <Typography
            variant='caption'
            className={cn(
              'text-xs',
              !schedule?.[0]?.sunday?.[0]?.time && 'text-gray-600',
            )}
          >
            Вс
          </Typography>
          <Typography variant='caption' className='text-xs'>
            {schedule?.[0]?.sunday?.[0]?.time ?? ''}
          </Typography>
        </div>
      </div>
      <Typography variant='caption' className='self-end text-xs text-gray-600'>
        {time_zone}
      </Typography>
    </div>
  )
}
