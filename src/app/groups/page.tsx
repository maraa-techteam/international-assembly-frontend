import { fetchGroups } from '@/lib/api/fetchGroups'
import { fetchGroupsPage } from '@/lib/api/fetchGroupsPage'
import {
  GroupsFilterDashboard,
  GroupsTable,
  Section,
  Typography,
} from '@/ui/components'
import { Pagination } from '@/ui/components'
import { Metadata } from 'next'
import { SearchParams } from 'next/dist/server/request/search-params'
import { Suspense } from 'react'

const pageData = await fetchGroupsPage()

export async function generateMetadata(): Promise<Metadata> {
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
  const filteredGroups = await fetchGroups(params)
  const groups = await fetchGroups()
  const page = pageData[0]

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
        <Typography variant='h1'>{page.title}</Typography>
      </Section>
      <Section className='px-0 lg:max-w-250 lg:pt-0 lg:pr-0' color={'white'}>
        <Suspense fallback={null}>
          <GroupsFilterDashboard
            dropdownOptions={{
              country: countries,
              presence: presence,
              schedule: schedule,
            }}
          />
        </Suspense>
      </Section>
      <Section
        className='px-0 pt-0 lg:max-w-250 lg:pt-0 lg:pr-0'
        color={'white'}
      >
        <GroupsTable groups={filteredGroups} />
        <Pagination fetchedCount={filteredGroups.length} />
      </Section>
    </>
  )
}
