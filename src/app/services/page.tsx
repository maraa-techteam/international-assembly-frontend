import { WorkInProgress } from '@/common/components/WorkInProgress/WorkInProgress'
import { buildPageMetadata } from '@/config/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildPageMetadata({ path: '/services' })

export default async function Page() {
  return <WorkInProgress />
}
