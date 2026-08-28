import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readSingleton, withOptions } from '@directus/sdk'

import directus from '../lib/directus'
import { unwrapSingleton } from './unwrapSingleton'

export async function fetchGroupsPage() {
  try {
    const raw = await directus.request(
      withOptions(
        readSingleton('groups_page', {
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
    const item = unwrapSingleton(raw)

    return {
      meta_title: item.meta_title,
      meta_description: item.meta_description,
      title: item.title,
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch groups page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
