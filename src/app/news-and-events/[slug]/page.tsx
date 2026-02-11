import { ArticleDetailPage } from '@/features/articles'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <ArticleDetailPage params={params} />
}
