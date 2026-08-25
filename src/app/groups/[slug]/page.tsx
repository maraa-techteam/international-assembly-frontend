import { toMetaDescription } from '@/common/utils/toMetaDescription'
import { buildPageMetadata } from '@/config/seo'
import { fetchGroup } from '@/features/groups/api/fetchGroup'
import { fetchGroups } from '@/features/groups/api/fetchGroups'
import { GroupDetailPage } from '@/features/groups/pages/GroupDetailPage'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const group = await fetchGroup(slug)

  return buildPageMetadata({
    title: group?.name as string | undefined,
    // The CMS stores the description as rich text, so it has to be flattened
    // before it can go in a meta tag.
    description: toMetaDescription(group?.description as string | undefined),
    path: `/groups/${slug}`,
    fallbackTitle: 'Группа',
    fallbackDescription: 'Узнайте больше о группе и её деятельности.',
  })
}

export async function generateStaticParams() {
  const { data: groups } = await fetchGroups({ limit: '-1' })
  return groups.map((group) => ({
    slug: group.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <GroupDetailPage params={params} />
}
