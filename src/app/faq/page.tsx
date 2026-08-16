import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const [page] = await fetchPage('faq_page')

  return buildPageMetadata({
    title: page.meta_title,
    description: page.meta_description,
    path: '/faq',
    fallbackTitle: 'Ответы на вопросы',
  })
}

export default async function Faq() {
  const [page] = await fetchPage('faq_page')

  return (
    <>
      <Page {...page} />
    </>
  )
}
