import { buildPageMetadata } from '@/config/seo'
import { fetchArticle } from '@/features/articles/api/fetchArticle'
import { fetchArticles } from '@/features/articles/api/fetchArticles'
import { ArticleDetailPage } from '@/features/articles/pages/ArticleDetailPage'
import type { Metadata } from 'next'

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

export async function generateStaticParams() {
  const articles = await fetchArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <ArticleDetailPage params={params} />
}
