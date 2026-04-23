import { readItems } from '@directus/sdk'

import directus from '../lib/directus'

export async function fetchServicesPage() {
  try {
    const raw = await directus.request(
      readItems('services_page', {
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
      `Failed to fetch services page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
