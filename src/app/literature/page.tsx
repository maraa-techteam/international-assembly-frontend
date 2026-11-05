import { buildPageMetadata } from '@/config/seo'
import { LiteraturePage } from '@/features/literature/pages/LiteraturePage'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildPageMetadata({ path: '/literature' })

export default async function Page() {
  return <LiteraturePage />
}
