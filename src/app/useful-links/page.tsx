import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({ path: '/useful-links' })

export default async function UsefulLinks() {
  const page = await fetchPage('useful_links_page')

  return (
    <>
      <Page {...page} />
    </>
  )
}
