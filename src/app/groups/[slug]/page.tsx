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
  return {
    title: (group?.name ?? 'Группа') + ' | Группа АА',
    description:
      group?.description ?? 'Узнайте больше о группе и её деятельности.',
    alternates: {
      canonical: `/groups/${slug}`,
    },
  }
}

export const revalidate = 60

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
