import { buildPageMetadata } from '@/config/seo'
import { ContactsPage } from '@/features/contacts/pages/ContactsPage'
import { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({ path: '/contacts' })

export default async function Page() {
  return <ContactsPage />
}
