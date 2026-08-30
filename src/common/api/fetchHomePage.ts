import { cache } from 'react'

import { META_FIELDS, PageMetaType, fetchSingleton } from './fetchSingleton'

export type HomePageType = PageMetaType

export const fetchHomePage = cache(async function fetchHomePage() {
  return fetchSingleton<HomePageType>('home_page', META_FIELDS)
})
