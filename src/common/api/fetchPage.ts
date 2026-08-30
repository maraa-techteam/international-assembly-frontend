import { PageType } from '@/common/pages/Page.type'
import { cache } from 'react'

import { META_FIELDS, fetchSingleton } from './fetchSingleton'

const PAGE_FIELDS = [
  ...META_FIELDS,
  'title',
  'text',
  'additional_link',
  'image.id',
  'image.width',
  'image.height',
  'button_left',
  'button_right',
  'rich_text',
  'faq',
]

export const fetchPage = cache(async function fetchPage(collection: string) {
  return fetchSingleton<PageType>(collection, PAGE_FIELDS)
})
