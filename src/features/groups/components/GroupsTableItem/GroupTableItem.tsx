import { Typography } from '@/common/components/Typography/Typography'
import Link from 'next/link'

import { GroupType } from '../../types/Group.type'
import { GroupSchedule } from '../GroupSchedule/GroupSchedule'

type GroupsTableItemProps = GroupType

export default function GroupsTableItem({
  group,
}: {
  group: GroupsTableItemProps
}) {
  return (
    <Link
      href={`/groups/${group.slug}`}
      className='focus:bg-light-blue hover:bg-light-blue active:bg-light-blue flex cursor-pointer flex-col divide-y divide-gray-300'
    >
      <div className='over:bg-light-blue grid grid-cols-[0.3fr_0.2fr_0.2fr_0.4fr] gap-4 px-4 lg:grid-cols-[0.5fr_0.3fr_0.3fr_1fr]'>
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
