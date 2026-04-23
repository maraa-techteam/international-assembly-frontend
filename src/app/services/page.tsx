import { ServicesListPage } from '@/features/services'
import { SearchParams } from 'next/dist/server/request/search-params'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return <ServicesListPage searchParams={searchParams} />
}
