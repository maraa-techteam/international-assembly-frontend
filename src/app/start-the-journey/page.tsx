import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const [page] = await fetchPage('start_the_journey_page')

  return buildPageMetadata({
    title: page.meta_title,
    description: page.meta_description,
    path: '/start-the-journey',
    fallbackTitle: 'Начать путь',
  })
}

export default async function StartTheJourney() {
  const [page] = await fetchPage('start_the_journey_page')

  return (
    <>
      <Page {...page} />
    </>
  )
}
