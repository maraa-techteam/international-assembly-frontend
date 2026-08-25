import { fetchGroupsPage } from '@/common/api/fetchGroupsPage'
import { Pagination } from '@/common/components/Pagination/Pagination'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'
import type { SearchParams } from '@/common/types/SearchParams'
import { fetchGroupCountries } from '@/features/groups/api/fetchGroupCountries'
import { fetchGroups } from '@/features/groups/api/fetchGroups'
import { GroupsFilterDashboard } from '@/features/groups/components/GroupsFilterDashboard'
import { GroupsTable } from '@/features/groups/components/GroupsTable'
import { Suspense } from 'react'

export async function GroupsListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const pageData = await fetchGroupsPage()
  const params = await searchParams
  const { data: filteredGroups, totalCount } = await fetchGroups(params)
  const page = pageData[0]

  const countries = await fetchGroupCountries()
  const presence = ['Онлайн', 'Офлайн', 'Гибрид']
  const schedule = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ]

  return (
    <>
      <Section className='py-0' color='white'>
        <Typography variant='h1'>{page.title}</Typography>
      </Section>
      <Section className='px-0 lg:max-w-250 lg:pt-0 lg:pr-0' color='white'>
        <Suspense>
          <GroupsFilterDashboard
            dropdownOptions={{
              country: countries,
              presence: presence,
              schedule: schedule,
            }}
          />
        </Suspense>
      </Section>
      <Section className='px-0 pt-0 lg:max-w-250 lg:pt-0 lg:pr-0' color='white'>
        <GroupsTable groups={filteredGroups} />
        <Pagination
          fetchedCount={filteredGroups.length}
          totalCount={totalCount}
        />
      </Section>
    </>
  )
}
