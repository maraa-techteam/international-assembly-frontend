import { cache } from 'react'

import { META_FIELDS, PageMetaType, fetchSingleton } from './fetchSingleton'

export type LiteraturePageType = PageMetaType & {
  title: string
  text: string
}

export const fetchLiteraturePage = cache(async function fetchLiteraturePage() {
  return fetchSingleton<LiteraturePageType>('literature_page', [
    ...META_FIELDS,
    'title',
    'text',
  ])
})
