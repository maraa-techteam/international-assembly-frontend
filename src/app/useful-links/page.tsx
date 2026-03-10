import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { Metadata } from 'next'

const pageData = await fetchPage('useful_links_page')

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return {
    title: page.meta_title,
    description: page.meta_description,
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
