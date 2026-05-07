import { fetchGroupsPage } from '@/common/api/fetchGroupsPage'
import { GroupsListPage } from '@/features/groups'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { SearchParams } from 'next/dist/server/request/search-params'

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
