import { fetchContactsPage } from '@/common/api/fetchContactsPage'
import { buildPageMetadata } from '@/config/seo'
import { ContactsPage } from '@/features/contacts/pages/ContactsPage'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchContactsPage()

  return buildPageMetadata({
    title: page?.meta_title,
    description: page?.meta_description,
    path: '/contacts',
  })
}

export default async function Page() {
  return <ContactsPage />
}
