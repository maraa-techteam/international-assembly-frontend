import { cache } from 'react'

import { META_FIELDS, PageMetaType, fetchSingleton } from './fetchSingleton'

export type ServicesPageType = PageMetaType & {
  title: string
  text: string
}

export const fetchServicesPage = cache(async function fetchServicesPage() {
  return fetchSingleton<ServicesPageType>('services_page', [
    ...META_FIELDS,
    'title',
    'text',
  ])
})
