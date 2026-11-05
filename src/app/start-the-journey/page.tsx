import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  path: '/start-the-journey',
})

export default async function StartTheJourney() {
  const page = await fetchPage('start_the_journey_page')

  return (
    <>
      <Page {...page} />
    </>
  )
}
