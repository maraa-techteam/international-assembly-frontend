import { readItems } from '@directus/sdk'

import directus from '../lib/directus'

export async function getSocials() {
  try {
    const raw = await directus.request(
      readItems('social_media', {
        fields: ['name', 'href', 'icon'],
      }),
    )
    return raw.map((item) => {
      return {
        name: item.name,
        href: item.href,
        icon: item.icon,
      }
    })
  } catch (error) {
    throw new Error(
      `Failed to fetch social media data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
