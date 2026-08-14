import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

const pageData = await fetchPage('about_international_assembly_page')

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return buildPageMetadata({
    title: page.meta_title,
    description: page.meta_description,
    path: '/about-international-assembly',
    fallbackTitle: 'Что такое МА?',
  })
}

export default async function AboutInternationalAssembly() {
  const page = pageData[0]
  return (
    <>
      <Page {...page} />
    </>
  )
}
