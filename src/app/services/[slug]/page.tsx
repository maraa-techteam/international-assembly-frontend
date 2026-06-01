import { fetchService } from '@/features/services/api/fetchService'
import { fetchServices } from '@/features/services/api/fetchServices'
import { ServiceDetailPage } from '@/features/services/pages/ServiceDetailPage'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await fetchService(slug)
  return {
    title: (service?.name ?? 'Служение') + ' | Международная Ассамблея АА',
    description: 'Узнайте больше о служении и подайте заявку на участие в нем.',
    alternates: {
      canonical: `/services/${slug}`,
    },
  }
}

export const revalidate = 60

export async function generateStaticParams() {
  const services = await fetchServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <ServiceDetailPage params={params} />
}
