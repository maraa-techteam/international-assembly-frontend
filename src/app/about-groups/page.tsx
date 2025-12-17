import { getPageData } from '@/lib/api/fetchPage'
import { Metadata } from 'next'

import PageBuilder from '../pageBuilder'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageData('about-groups')
  return {
    title: pageData[0].meta_title,
    description: pageData[0].meta_description,
  }
}

export default async function AboutGroups() {
  const pageData = await getPageData('about-groups')

  return <PageBuilder pageData={pageData[0]} />
}
