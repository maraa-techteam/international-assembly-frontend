import { buildPageMetadata } from '@/config/seo'
import { ArticlesListPage } from '@/features/articles/pages/ArticlesListPage'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildPageMetadata({
  path: '/news-and-events',
})

export default async function Page() {
  return <ArticlesListPage />
}
