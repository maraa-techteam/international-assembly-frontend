import {
  LiteratureCategoryPage,
  LiteratureDetailPage,
  literatureSlugToType,
} from '@/features/literature'
import { SearchParams } from 'next/dist/server/request/search-params'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: SearchParams
}) {
  const { slug } = await params

  // If the slug matches a known category (e.g. "books", "brochures"), show the category listing page
  const type = literatureSlugToType[slug]
  if (type) {
    return <LiteratureCategoryPage type={type} searchParams={searchParams} />
  }

  // Otherwise treat the slug as an item ID and show the detail page
  return <LiteratureDetailPage params={params} />
}
