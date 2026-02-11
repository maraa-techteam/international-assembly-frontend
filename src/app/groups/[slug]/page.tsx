import { GroupDetailPage } from '@/features/groups'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <GroupDetailPage params={params} />
}
