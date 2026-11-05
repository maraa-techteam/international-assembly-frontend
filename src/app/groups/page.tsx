import type { SearchParams } from '@/common/types/SearchParams'
import { buildPageMetadata } from '@/config/seo'
import { GroupsListPage } from '@/features/groups/pages/GroupsListPage'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildPageMetadata({ path: '/groups' })

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  return <GroupsListPage searchParams={searchParams} />
}
