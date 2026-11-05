import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({ path: '/about-aa' })

export default async function AboutAA() {
  const page = await fetchPage('about_aa_page')
  return (
    <>
      <Page {...page} />
    </>
  )
}
