import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readItems, withOptions } from '@directus/sdk'

import directus from '../lib/directus'

export async function getSocials() {
  try {
    const raw = await directus.request(
      withOptions(
        readItems('social_media', {
          fields: ['name', 'href', 'icon'],
        }),
        {
          next: {
            revalidate: CMS_REVALIDATE_SECONDS,
            tags: ['cms', 'cms:social_media'],
          },
        },
      ),
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
