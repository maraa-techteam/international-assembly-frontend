import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function fetchGroupsPage() {
  const raw = await directus.request(
    readItems('about_groups_page', {
      fields: ['meta_title', 'meta_description', 'title'],
    }),
  )
  return raw.map((item) => {
    return {
      meta_title: item.meta_title,
      meta_description: item.meta_description,
      title: item.title,
    }
  })
}
