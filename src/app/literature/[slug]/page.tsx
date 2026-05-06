import {
  LiteratureCategoryPage,
  LiteratureDetailPage,
  fetchLiteratureItem,
  literatureSlugToType,
} from '@/features/literature'
import { Metadata } from 'next'
import { SearchParams } from 'next/dist/server/request/search-params'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await fetchLiteratureItem(slug)

  return {
    title: page?.title + ' | Международная Ассамблея АА',
    description: page?.description,
  }
}

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
