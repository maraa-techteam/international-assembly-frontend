import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readItems, withOptions } from '@directus/sdk'

import directus from '../lib/directus'

export async function fetchHomePage() {
  try {
    const raw = await directus.request(
      withOptions(
        readItems('home_page', {
          fields: ['meta_title', 'meta_description'],
        }),
        {
          next: {
            revalidate: CMS_REVALIDATE_SECONDS,
            tags: ['cms', 'cms:home_page'],
          },
        },
      ),
    )
    return raw.map((item) => {
      return {
        meta_title: item.meta_title,
        meta_description: item.meta_description,
      }
    })
  } catch (error) {
    throw new Error(
      `Failed to fetch home page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
