import { buildPageMetadata } from '@/config/seo'
import { fetchArticle } from '@/features/articles/api/fetchArticle'
import { ArticleDetailPage } from '@/features/articles/pages/ArticleDetailPage'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchArticle(slug)

  return buildPageMetadata({
    title: article?.title as string | undefined,
    description: article?.perex as string | undefined,
    path: `/news-and-events/${slug}`,
    fallbackTitle: 'Новости и события АА',
    fallbackDescription:
      'Новости и события Международной Ассамблеи по Общему Обслуживанию русскоязычных Анонимных Алкоголиков.',
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <ArticleDetailPage params={params} />
}
