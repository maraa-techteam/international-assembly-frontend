import { fetchGroupsPage } from '@/common/api/fetchGroupsPage'
import type { SearchParams } from '@/common/types/SearchParams'
import { buildPageMetadata } from '@/config/seo'
import { GroupsListPage } from '@/features/groups/pages/GroupsListPage'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const [page] = await fetchGroupsPage()

  return buildPageMetadata({
    title: page?.meta_title,
    description: page?.meta_description,
    path: '/groups',
    fallbackTitle: 'Поиск группы',
  })
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  return <GroupsListPage searchParams={searchParams} />
}
