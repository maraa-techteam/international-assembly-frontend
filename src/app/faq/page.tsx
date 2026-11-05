import { fetchPage } from '@/common/api/fetchPage'
import { JsonLd } from '@/common/components/JsonLd/JsonLd'
import Page from '@/common/pages/Page'
import { faqSchema } from '@/config/schema'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({ path: '/faq' })

export default async function Faq() {
  const page = await fetchPage('faq_page')

  return (
    <>
      <JsonLd schema={faqSchema(page.faq ?? [])} />
      <Page {...page} />
    </>
  )
}
