import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { Metadata } from 'next'

const pageData = await fetchPage('useful_links_page')

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return {
    metadataBase: new URL(process.env.PRODUCTION_FRONTEND_URL || ''),
    title: page.meta_title + ' | Международная Ассамблея АА',
    description: page.meta_description,
    alternates: {
      canonical: '/useful-links',
    },
  }
}

export default async function UsefulLinks() {
  const page = pageData[0]

  return (
    <>
      <Page {...page} />
    </>
  )
}
