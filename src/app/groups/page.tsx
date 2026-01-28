import { fetchGroups } from '@/lib/api/fetchGroups'
import { fetchGroupsPage } from '@/lib/api/fetchGroupsPage'
import { Section, Typography } from '@/ui/components'
import { Pagination } from '@/ui/components'
import GroupsFilterDashboard from '@/ui/components/Groups/GroupsFilterDashboard'
import GroupsTable from '@/ui/components/Groups/GroupsTable'
import { Metadata } from 'next'
import { SearchParams } from 'next/dist/server/request/search-params'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchGroupsPage()
  return {
    title: pageData[0].meta_title,
    description: pageData[0].meta_description,
  }
}

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const pageData = await fetchGroupsPage()
  const { items: filteredGroups, totalCount, page, limit } = await fetchGroups(params)
  const { items: groups } = await fetchGroups()
  const pageInfo = pageData[0]

  const countries = [...new Set(groups.map((group) => group.country))]
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
      <Section className='py-0' color={'white'}>
        <Typography variant='h1'>{pageInfo.title}</Typography>
      </Section>
      <Section className='px-0 lg:max-w-250 lg:pt-0 lg:pr-0' color={'white'}>
        <GroupsFilterDashboard
          dropdownOptions={{
            country: countries,
            presence: presence,
            schedule: schedule,
          }}
        />
      </Section>
      <Section
        className='px-0 pt-0 lg:max-w-250 lg:pt-0 lg:pr-0'
        color={'white'}
      >
        <GroupsTable groups={filteredGroups} />
        <Pagination totalCount={totalCount} currentPage={page} limit={limit} />
      </Section>
    </>
  )
}
