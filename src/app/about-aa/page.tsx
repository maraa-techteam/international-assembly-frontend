import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

const pageData = await fetchPage('about_aa_page')

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return buildPageMetadata({
    title: page.meta_title,
    description: page.meta_description,
    path: '/about-aa',
    fallbackTitle: 'Что такое АА?',
  })
}

export default async function AboutAA() {
  const page = pageData[0]
  return (
    <>
      <Page {...page} />
    </>
  )
}
