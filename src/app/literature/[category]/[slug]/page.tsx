import { fetchLiteratureItem } from '@/features/literature/api/fetchLiteratureItem'
import { fetchLiteratureItems } from '@/features/literature/api/fetchLiteratureItems'
import { LiteratureDetailPage } from '@/features/literature/pages/LiteratureDetailPage'
import { LiteratureItemType } from '@/features/literature/types/LiteratureItem.type'
import { literatureCategorySlugs } from '@/features/literature/utils/literature.utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 60

// Invert literatureCategorySlugs at module level: { books: 'book', ... }
const slugToType = Object.fromEntries(
  Object.entries(literatureCategorySlugs).map(([type, slug]) => [slug, type]),
) as Record<string, LiteratureItemType>

export async function generateStaticParams() {
  const items = await fetchLiteratureItems()
  return items.map((item) => ({
    category: literatureCategorySlugs[item.item_type],
    slug: item.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category, slug } = await params
  const item = await fetchLiteratureItem(slug)
  if (!item) notFound()

  return {
    title: item.title + ' | Литература АА',
    description: item.description,
    alternates: {
      canonical: `/literature/${category}/${slug}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params

  // Guard against unknown categories (e.g. direct URL manipulation)
  if (!slugToType[category]) notFound()

  return <LiteratureDetailPage slug={slug} />
}
