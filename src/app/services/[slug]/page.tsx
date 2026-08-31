import { toMetaDescription } from '@/common/utils/toMetaDescription'
import { buildPageMetadata } from '@/config/seo'
import { fetchService } from '@/features/services/api/fetchService'
import { fetchServices } from '@/features/services/api/fetchServices'
import { ServiceDetailPage } from '@/features/services/pages/ServiceDetailPage'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await fetchService(slug)

  return buildPageMetadata({
    title: service?.name,
    // The CMS stores the description as rich text, so it has to be flattened
    // before it can go in a meta tag.
    description: toMetaDescription(service?.description),
    path: `/services/${slug}`,
    fallbackTitle: 'Служение',
    fallbackDescription:
      'Узнайте больше о служении в Международной Ассамблее русскоязычных АА и подайте заявку на участие в нём.',
  })
}

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
