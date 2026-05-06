import { fetchPage } from '@/common/api/fetchPage'
import Page from '@/common/pages/Page'
import { Metadata } from 'next'

const pageData = await fetchPage('about_groups_page')

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return {
    title: page.meta_title + ' | Международная Ассамблея АА',
    description: page.meta_description,
  }
}

export default async function AboutGroups() {
  const page = pageData[0]

  return (
    <>
      <Page {...page} />
    </>
  )
}
