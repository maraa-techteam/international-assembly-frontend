import { GroupsListPage } from '@/features/groups'
import { SearchParams } from 'next/dist/server/request/search-params'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return <GroupsListPage searchParams={searchParams} />
}
