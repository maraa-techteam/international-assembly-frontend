import type { SearchParams } from '@/common/types/SearchParams'
import { buildPageMetadata } from '@/config/seo'
import { SearchResultsPage } from '@/features/search/pages/SearchResultsPage'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    fallbackTitle: 'Результаты поиска',
    fallbackDescription:
      'Результаты поиска по вашему запросу на сайте Международной Ассамблеи русскоязычных Анонимных Алкоголиков.',
  })
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  return <SearchResultsPage searchParams={searchParams} />
}
