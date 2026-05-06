import { fetchServicesPage } from '@/common/api/fetchServicesPage'
import { ServicesListPage } from '@/features/services'
import { Metadata } from 'next'

const pageData = await fetchServicesPage()

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return {
    metadataBase: new URL(process.env.PRODUCTION_FRONTEND_URL || ''),
    title: page.meta_title + ' | Международная Ассамблея АА',
    description: page.meta_description,
    alternates: {
      canonical: '/services',
    },
  }
}

export default async function Page() {
  return <ServicesListPage />
}
