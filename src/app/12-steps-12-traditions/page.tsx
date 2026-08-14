import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

const pageData = await fetchPage('steps_and_traditions_page')

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return buildPageMetadata({
    title: page.meta_title,
    description: page.meta_description,
    path: '/12-steps-12-traditions',
    fallbackTitle: '12 шагов и 12 традиций',
  })
}

export default async function TwelveStepsTwelveTraditions() {
  const page = pageData[0]

  return (
    <>
      <Page {...page} />
    </>
  )
}
