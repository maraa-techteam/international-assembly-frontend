import { fetchArticle } from '@/features/articles/api/fetchArticle'
import { fetchArticles } from '@/features/articles/api/fetchArticles'
import { ArticleDetailPage } from '@/features/articles/pages/ArticleDetailPage'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await fetchArticle(slug)

  return {
    title: `${page?.title ?? 'Новости и события'} | Международная Ассамблея АА`,
    description: page?.perex,
    alternates: {
      canonical: `/news-and-events/${slug}`,
    },
  }
}

export const revalidate = 60

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
