import { readItems } from '@directus/sdk'

import directus from '../../../common/lib/directus'

export async function fetchSearchResults(query: string) {
  try {
    return await directus.request(
      readItems('article', {
        search: query,
        fields: ['id', 'slug', 'title', 'perex', 'image', 'date_created'],
      }),
    )
  } catch (error) {
    throw new Error(
      `Failed to fetch search results: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
