import type { SearchParams } from '@/common/types/SearchParams'
import { buildPageMetadata } from '@/config/seo'
import { LiteratureCategoryPage } from '@/features/literature/pages/LiteratureCategoryPage'
import { LiteratureCategory } from '@/features/literature/types/LiteratureItem.type'
import {
  literatureCategoryLabels,
  literatureCategorySlugs,
} from '@/features/literature/utils/literature.utils'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Only statically known categories are valid — anything else is a 404
export const dynamicParams = false

export async function generateStaticParams() {
  return Object.values(literatureCategorySlugs).map((category) => ({
    category,
  }))
}

// Invert literatureCategorySlugs at module level: { books: 'books', ... }
const slugToType = Object.fromEntries(
  Object.entries(literatureCategorySlugs).map(([type, slug]) => [slug, type]),
) as Record<string, LiteratureCategory>

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const type = slugToType[category]
  if (!type) notFound()

  return buildPageMetadata({
    title: literatureCategoryLabels[type],
    path: `/literature/${category}`,
    fallbackDescription: `${literatureCategoryLabels[type]} Анонимных Алкоголиков на русском языке: издания, одобренные конференцией, и материалы для новичков и групп.`,
  })
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<SearchParams>
}) {
  const { category } = await params
  const type = slugToType[category]
  if (!type) notFound()

  return <LiteratureCategoryPage type={type} searchParams={searchParams} />
}
