import { buildPageMetadata } from '@/config/seo'
import { ContactsPage } from '@/features/contacts/pages/ContactsPage'
import { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = buildPageMetadata({ path: '/contacts' })

export default function Page() {
  return <ContactsPage />
}
