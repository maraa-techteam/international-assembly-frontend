import { fetchLiteraturePage } from '@/common/api/fetchLiteraturePage'
import { buildPageMetadata } from '@/config/seo'
import { LiteraturePage } from '@/features/literature/pages/LiteraturePage'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchLiteraturePage()

  return buildPageMetadata({
    title: page?.meta_title,
    description: page?.meta_description,
    path: '/literature',
  })
}

export default async function Page() {
  return <LiteraturePage />
}
