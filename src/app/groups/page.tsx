import { fetchGroupsPage } from '@/common/api/fetchGroupsPage'
import { GroupsListPage } from '@/features/groups'
import type { Metadata } from 'next'

type SearchParams = Record<string, string | string[] | undefined>

const pageData = await fetchGroupsPage()

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageData[0].meta_title + ' | Группы АА',
    description: pageData[0].meta_description,
    alternates: {
      canonical: '/groups',
    },
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return <GroupsListPage searchParams={searchParams} />
}
