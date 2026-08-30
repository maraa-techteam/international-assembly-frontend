import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage('about_international_assembly_page')

  return buildPageMetadata({
    title: page.meta_title,
    description: page.meta_description,
    path: '/about-international-assembly',
  })
}

export default async function AboutInternationalAssembly() {
  const page = await fetchPage('about_international_assembly_page')
  return (
    <>
      <Page {...page} />
    </>
  )
}
