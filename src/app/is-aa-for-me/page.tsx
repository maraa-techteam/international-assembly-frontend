import { buildPageMetadata } from '@/config/seo'
import { IsAaForMePage } from '@/features/quiz/pages/IsAaForMePage'
import { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = buildPageMetadata({ path: '/is-aa-for-me' })

export default function Page() {
  return <IsAaForMePage />
}
