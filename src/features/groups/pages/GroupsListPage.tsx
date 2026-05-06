import { fetchGroupsPage } from '@/common/api/fetchGroupsPage'
import { Pagination, Typography } from '@/common/components'
import { Section } from '@/common/layouts'
import {
  GroupsFilterDashboard,
  GroupsTable,
  fetchGroupCountries,
  fetchGroups,
} from '@/features/groups'
import { SearchParams } from 'next/dist/server/request/search-params'
import { Suspense } from 'react'

export async function GroupsListPage({
  searchParams,
}: {
  searchParams: SearchParams
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
