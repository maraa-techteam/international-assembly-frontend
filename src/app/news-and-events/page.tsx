import { fetchNewsAndEventsPage } from '@/common/api/fetchNewsAndEventsPage'
import { buildPageMetadata } from '@/config/seo'
import { ArticlesListPage } from '@/features/articles/pages/ArticlesListPage'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const [page] = await fetchNewsAndEventsPage()

  return buildPageMetadata({
    title: page?.meta_title,
    description: page?.meta_description,
    path: '/news-and-events',
    fallbackTitle: 'Новости и события',
  })
}

export default async function Page() {
  return <ArticlesListPage />
}
