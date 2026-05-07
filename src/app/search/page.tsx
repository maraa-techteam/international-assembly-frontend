import { SearchResultsPage } from '@/features/search'
import type { Metadata } from 'next'
import { SearchParams } from 'next/dist/server/request/search-params'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Результаты поиска | Международная Ассамблея АА',
    description:
      'Результаты поиска по вашему запросу на сайте Международной Ассамблеи АА.',
    alternates: {
      canonical: '/search',
    },
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return <SearchResultsPage searchParams={searchParams} />
}
