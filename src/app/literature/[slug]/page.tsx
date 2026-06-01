import { fetchLiteratureItem } from '@/features/literature/api/fetchLiteratureItem'
import { fetchLiteratureItems } from '@/features/literature/api/fetchLiteratureItems'
import { LiteratureCategoryPage } from '@/features/literature/pages/LiteratureCategoryPage'
import { LiteratureDetailPage } from '@/features/literature/pages/LiteratureDetailPage'
import { literatureSlugToType } from '@/features/literature/utils/literature.utils'
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
    title: page?.title + ' | Литература АА',
    description: page?.description,
    alternates: {
      canonical: `/literature/${slug}`,
    },
  }
}

export const revalidate = 60

export async function generateStaticParams() {
  const items = await fetchLiteratureItems()
  return items.map((item) => ({
    slug: item.slug,
  }))
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
