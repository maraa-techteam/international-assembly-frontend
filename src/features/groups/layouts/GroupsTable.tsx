import { Typography } from '@/common/components/Typography/Typography'

import GroupsTableItem from '../components/GroupsTableItem/GroupTableItem'
import { GroupType } from '../types/Group.type'

type GroupsTableProps = {
  groups: GroupType[]
}

export function GroupsTable({ groups }: GroupsTableProps) {
  if (groups.length === 0) {
    return (
      <div className='px-4 lg:px-0'>
        <Typography variant='body'>Группы не найдены</Typography>
      </div>
    )
  }
  return (
    <>
      <div className='overflow-x-auto px-4 lg:px-0'>
        <div
          className={
            'border-primary flex min-w-300 flex-col overflow-hidden rounded-2xl border-2 lg:min-w-full'
          }
        >
          <div className='bg-primary grid grid-cols-[0.3fr_0.2fr_0.2fr_0.4fr] gap-4 px-4 lg:grid-cols-[0.5fr_0.3fr_0.3fr_1fr]'>
            <Typography className='py-4' variant='caption'>
              Название группы
            </Typography>
            <Typography className='py-4' variant='caption'>
              Страна
            </Typography>
            <Typography className='py-4' variant='caption'>
              Формат
            </Typography>
            <Typography className='py-4' variant='caption'>
              Расписание
            </Typography>
          </div>
          {groups?.map((group: GroupType) => (
            <GroupsTableItem key={group.id} group={group} />
          ))}
        </div>
      </div>
    </>
  )
}
