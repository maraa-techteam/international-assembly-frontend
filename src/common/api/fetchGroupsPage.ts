import { readItems } from '@directus/sdk'

import directus from '../lib/directus'

export async function fetchGroupsPage() {
  try {
    const raw = await directus.request(
      readItems('groups_page', {
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
  } catch (error) {
    throw new Error(
      `Failed to fetch groups page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
