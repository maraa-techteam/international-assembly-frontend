import { ArticleDetailPage, fetchArticle } from '@/features/articles'
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <ArticleDetailPage params={params} />
}
