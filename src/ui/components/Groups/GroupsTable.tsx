import { Typography } from '@/ui/components'

import GroupTableItem, { GroupType } from './GroupTableItem'

type GroupsTableProps = {
  groups: GroupType[]
}

export default function GroupsTable({ groups }: GroupsTableProps) {
  if (groups.length === 0) {
    return <Typography variant='body'>Группы не найдены</Typography>
  }
  return (
    <div className='overflow-x-auto px-4 lg:px-0'>
      <div
        className={
          'border-primary flex min-w-300 flex-col overflow-hidden rounded-2xl border-2 lg:min-w-full'
        }
      >
        <div className='bg-primary grid grid-cols-[1fr_0.5fr_0.5fr_1.5fr] gap-4 px-4'>
          <Typography className='py-4' variant='caption'>
            Название группы
          </Typography>
          <Typography className='py-4' variant='caption'>
            Страна
          </Typography>
          <Typography className='py-4' variant='caption'>
            Присутствие
          </Typography>
          <Typography className='py-4' variant='caption'>
            Расписание
          </Typography>
        </div>
        {groups?.map((group: GroupType, index) => (
          <GroupTableItem key={index} group={group} />
        ))}
      </div>
    </div>
  )
}
