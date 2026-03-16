import { SearchResultsPage } from '@/features/search'
import { SearchParams } from 'next/dist/server/request/search-params'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return <SearchResultsPage searchParams={searchParams} />
}
