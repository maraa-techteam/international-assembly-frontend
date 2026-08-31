import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readItems, withOptions } from '@directus/sdk'
import { cache } from 'react'

import directus from '../../../common/lib/directus'
import { LiteratureItem } from '../types/LiteratureItem.type'
import {
  LITERATURE_ITEM_FIELDS,
  toLiteratureItem,
} from './literatureItemFields'

export const fetchLiteratureItem = cache(async function fetchLiteratureItem(
  slug: string,
): Promise<LiteratureItem | null> {
  try {
    const raw = await directus.request(
      withOptions(
        readItems('literature_items', {
          filter: { slug: { _eq: slug } },
          fields: LITERATURE_ITEM_FIELDS,
          limit: 1,
        }),
        {
          next: {
            revalidate: CMS_REVALIDATE_SECONDS,
            tags: [
              'cms',
              'cms:literature_items',
              `cms:literature_items:${slug}`,
            ],
          },
        },
      ),
    )

    if (!raw[0]) return null

    return toLiteratureItem(raw[0])
  } catch (error) {
    throw new Error(
      `Failed to fetch literature item with slug "${slug}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
})
