import { Typography } from '@/ui'
import Link from 'next/link'

import { TimeZones } from '../types/TimeZones.type'
import { GroupSchedule } from './GroupSchedule'

export type GroupType = {
  id?: string
  name: string
  description: string
  country: string
  presence: string
  digital_address: string
  address: string
  website: string
  youtube: string
  telegram: string
  contact: { name: string; phone: string; email: string }[]
  schedule_slots: { day: string; time: string }[]
  time_zone: TimeZones
  slug: string
}

type GroupTableItemProps = GroupType

export default function GroupTableItem({
  group,
}: {
  group: GroupTableItemProps
}) {
  return (
    <Link
      href={`/groups/${group.slug}`}
      className='focus:bg-light-blue hover:bg-light-blue flex cursor-pointer flex-col divide-y divide-gray-300'
    >
      <div className='over:bg-light-blue grid grid-cols-[0.5fr_0.5fr_0.3fr_1fr] gap-4 px-4'>
        <Typography variant='body' className='truncate py-4'>
          {group.name}
        </Typography>
        <Typography variant='body' className='truncate py-4'>
          {group.country}
        </Typography>
        <Typography variant='body' className='truncate py-4'>
          {group.presence}
        </Typography>
        <GroupSchedule
          schedule={group.schedule_slots}
          time_zone={group.time_zone}
        />
      </div>
    </Link>
  )
}
