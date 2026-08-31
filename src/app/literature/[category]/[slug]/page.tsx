import { toMetaDescription } from '@/common/utils/toMetaDescription'
import { buildPageMetadata } from '@/config/seo'
import { fetchLiteratureItem } from '@/features/literature/api/fetchLiteratureItem'
import { fetchLiteratureItems } from '@/features/literature/api/fetchLiteratureItems'
import { LiteratureDetailPage } from '@/features/literature/pages/LiteratureDetailPage'
import { LiteratureCategory } from '@/features/literature/types/LiteratureItem.type'
import { literatureCategorySlugs } from '@/features/literature/utils/literature.utils'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Invert literatureCategorySlugs at module level: { books: 'books', ... }
const slugToType = Object.fromEntries(
  Object.entries(literatureCategorySlugs).map(([type, slug]) => [slug, type]),
) as Record<string, LiteratureCategory>

export async function generateStaticParams() {
  const items = await fetchLiteratureItems()
  return items.map((item) => ({
    category: literatureCategorySlugs[item.category],
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

  return buildPageMetadata({
    title: item.title,
    description: toMetaDescription(item.description),
    path: `/literature/${category}/${slug}`,
    fallbackTitle: 'Литература АА',
    fallbackDescription:
      'Литература Анонимных Алкоголиков на русском языке: книги, брошюры и буклеты о программе выздоровления от алкоголизма.',
  })
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
