import { LiteratureCategoryPage } from '@/features/literature/pages/LiteratureCategoryPage'
import { LiteratureItemType } from '@/features/literature/types/LiteratureItem.type'
import {
  literatureCategoryLabels,
  literatureCategorySlugs,
} from '@/features/literature/utils/literature.utils'
import { Metadata } from 'next'
import { SearchParams } from 'next/dist/server/request/search-params'
import { notFound } from 'next/navigation'

// Only statically known categories are valid — anything else is a 404
export const dynamicParams = false

export async function generateStaticParams() {
  return Object.values(literatureCategorySlugs).map((category) => ({
    category,
  }))
}

// Invert literatureCategorySlugs at module level: { books: 'book', ... }
const slugToType = Object.fromEntries(
  Object.entries(literatureCategorySlugs).map(([type, slug]) => [slug, type]),
) as Record<string, LiteratureItemType>

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const type = slugToType[category]
  if (!type) notFound()

  return {
    title: literatureCategoryLabels[type] + ' | Литература АА',
    alternates: {
      canonical: `/literature/${category}`,
    },
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: SearchParams
}) {
  const { category } = await params
  const type = slugToType[category]
  if (!type) notFound()

  return <LiteratureCategoryPage type={type} searchParams={searchParams} />
}
