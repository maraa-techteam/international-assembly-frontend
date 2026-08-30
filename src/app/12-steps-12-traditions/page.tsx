import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage('steps_and_traditions_page')

  return buildPageMetadata({
    title: page.meta_title,
    description: page.meta_description,
    path: '/12-steps-12-traditions',
  })
}

export default async function TwelveStepsTwelveTraditions() {
  const page = await fetchPage('steps_and_traditions_page')

  return (
    <>
      <Page {...page} />
    </>
  )
}
