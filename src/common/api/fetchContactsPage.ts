import { cache } from 'react'

import { META_FIELDS, PageMetaType, fetchSingleton } from './fetchSingleton'

export type ContactsPageType = PageMetaType & {
  title: string
  text: string
  secretary_email: string | null
}

export const fetchContactsPage = cache(async function fetchContactsPage() {
  return fetchSingleton<ContactsPageType>('contacts_page', [
    ...META_FIELDS,
    'title',
    'text',
    'secretary_email',
  ])
})
