import { fetchLiteraturePage } from '@/common/api/fetchLiteraturePage'
import { WorkInProgress } from '@/common/components/WorkInProgress/WorkInProgress'
import { buildPageMetadata } from '@/config/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchLiteraturePage()

  return buildPageMetadata({
    title: page?.meta_title,
    description: page?.meta_description,
    path: '/literature',
  })
}

export default async function Page() {
  return <WorkInProgress />
}
