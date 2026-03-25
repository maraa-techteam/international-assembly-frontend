import { LiteratureDetailPage } from '@/features/literature'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <LiteratureDetailPage params={params} />
}
