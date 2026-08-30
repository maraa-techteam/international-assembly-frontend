import { cache } from 'react'

import { META_FIELDS, PageMetaType, fetchSingleton } from './fetchSingleton'

export type GroupsPageType = PageMetaType & {
  title: string
}

export const fetchGroupsPage = cache(async function fetchGroupsPage() {
  return fetchSingleton<GroupsPageType>('groups_page', [
    ...META_FIELDS,
    'title',
  ])
})
