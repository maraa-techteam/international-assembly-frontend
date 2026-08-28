import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { buildPageMetadata } from '@/config/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage('about_groups_page')

  return buildPageMetadata({
    title: page.meta_title,
    description: page.meta_description,
    path: '/about-groups',
    fallbackTitle: 'О группах',
  })
}

export default async function AboutGroups() {
  const page = await fetchPage('about_groups_page')

  return (
    <>
      <Page {...page} />
    </>
  )
}
