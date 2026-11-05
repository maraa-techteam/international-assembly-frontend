import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  path: '/12-steps-12-traditions',
})

export default async function TwelveStepsTwelveTraditions() {
  const page = await fetchPage('steps_and_traditions_page')

  return (
    <>
      <Page {...page} />
    </>
  )
}
