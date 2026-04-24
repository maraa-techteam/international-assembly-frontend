import { ServiceDetailPage } from '@/features/services'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <ServiceDetailPage params={params} />
}
