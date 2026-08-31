import { buildPageMetadata } from '@/config/seo'
import { PrivacyPolicyPage } from '@/features/privacy/pages/PrivacyPolicyPage'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({ path: '/privacy' })

export default function Privacy() {
  return <PrivacyPolicyPage />
}
