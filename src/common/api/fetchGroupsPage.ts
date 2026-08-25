import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readItems, withOptions } from '@directus/sdk'

import directus from '../lib/directus'

export async function fetchGroupsPage() {
  try {
    const raw = await directus.request(
      withOptions(
        readItems('groups_page', {
          fields: ['meta_title', 'meta_description', 'title'],
        }),
        {
          next: {
            revalidate: CMS_REVALIDATE_SECONDS,
            tags: ['cms', 'cms:groups_page'],
          },
        },
      ),
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
