import { ServiceDetailPage } from '@/features/services'
import { fetchService } from '@/features/services/api/fetchService'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await fetchService(slug)
  return {
    metadataBase: new URL(process.env.PRODUCTION_FRONTEND_URL || ''),
    title: (service?.name ?? 'Служение') + ' | Международная Ассамблея АА',
    description: 'Узнайте больше о служении и подайте заявку на участие в нем.',
    alternates: {
      canonical: `/services/${slug}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <ServiceDetailPage params={params} />
}
