import { GroupDetailPage, fetchGroup } from '@/features/groups'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const group = await fetchGroup(slug)
  return {
    metadataBase: new URL(process.env.PRODUCTION_FRONTEND_URL || ''),
    title: (group?.name ?? 'Группа') + ' | Группа АА',
    description:
      group?.description ?? 'Узнайте больше о группе и её деятельности.',
    alternates: {
      canonical: `/groups/${slug}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <GroupDetailPage params={params} />
}
