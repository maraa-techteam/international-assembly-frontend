import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { Metadata } from 'next'

const pageData = await fetchPage('faq_page')

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return {
    title: page.meta_title + ' | Международная Ассамблея АА',
    description: page.meta_description,
    alternates: {
      canonical: '/faq',
    },
  }
}

export default async function Faq() {
  const page = pageData[0]

  return (
    <>
      <Page {...page} />
    </>
  )
}
