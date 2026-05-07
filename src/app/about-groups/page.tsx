import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { Metadata } from 'next'

const pageData = await fetchPage('about_groups_page')

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return {
    metadataBase: new URL(
      process.env.PRODUCTION_FRONTEND_URL || 'http://localhost:3000',
    ),
    title: page.meta_title + ' | Международная Ассамблея АА',
    description: page.meta_description,
    alternates: {
      canonical: '/about-groups',
    },
  }
}

export default async function AboutGroups() {
  const page = pageData[0]

  return (
    <>
      <Page {...page} />
    </>
  )
}
