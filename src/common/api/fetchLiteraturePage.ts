import { readItems } from '@directus/sdk'

import directus from '../lib/directus'

export async function fetchLiteraturePage() {
  try {
    const raw = await directus.request(
      readItems('literature_page', {
        fields: ['meta_title', 'meta_description', 'title', 'text'],
      }),
    )
    return raw.map((item) => {
      return {
        meta_title: item.meta_title,
        meta_description: item.meta_description,
        title: item.title,
        text: item.text,
      }
    })
  } catch (error) {
    throw new Error(
      `Failed to fetch literature page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
