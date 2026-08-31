import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readItems, withOptions } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import { LiteratureItem } from '../types/LiteratureItem.type'
import {
  LITERATURE_ITEM_FIELDS,
  toLiteratureItem,
} from './literatureItemFields'

export async function fetchLiteratureItems(): Promise<LiteratureItem[]> {
  try {
    const raw = await directus.request(
      withOptions(
        readItems('literature_items', {
          fields: LITERATURE_ITEM_FIELDS,
        }),
        {
          next: {
            revalidate: CMS_REVALIDATE_SECONDS,
            tags: ['cms', 'cms:literature_items'],
          },
        },
      ),
    )

    return raw.map(toLiteratureItem)
  } catch (error) {
    throw new Error(
      `Failed to fetch literature items: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
