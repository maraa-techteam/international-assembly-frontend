import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

const pageData = await fetchPage('to_professionals_page')

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return buildPageMetadata({
    title: page.meta_title,
    description: page.meta_description,
    path: '/to-professionals',
    fallbackTitle: 'Для профессионалов',
  })
}

export default async function ToProfessionals() {
  const page = pageData[0]

  return (
    <>
      <Page {...page} />
    </>
  )
}
