import type { SearchParams } from '@/common/types/SearchParams'
import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { aggregate, readItems, withOptions } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import {
  LiteratureCategory,
  LiteratureItem,
} from '../types/LiteratureItem.type'
import {
  LITERATURE_ITEM_FIELDS,
  toLiteratureItem,
} from './literatureItemFields'

const PAGE_SIZE = 10

export async function fetchLiteratureItemsByType(
  type: LiteratureCategory,
  params?: SearchParams,
): Promise<{ data: LiteratureItem[]; totalCount: number }> {
  const page = params?.page ? parseInt(params.page as string) : 1
  const limit = params?.limit ? parseInt(params.limit as string) : PAGE_SIZE

  const filter = { category: { _eq: type } }

  const cacheOptions = {
    next: {
      revalidate: CMS_REVALIDATE_SECONDS,
      tags: ['cms', 'cms:literature_items'],
    },
  }

  try {
    const [raw, countResult] = await Promise.all([
      directus.request(
        withOptions(
          readItems('literature_items', {
            filter,
            limit,
            page,
            fields: LITERATURE_ITEM_FIELDS,
          }),
          cacheOptions,
        ),
      ),
      directus.request(
        withOptions(
          aggregate('literature_items', {
            aggregate: { count: '*' },
            query: { filter },
          }),
          cacheOptions,
        ),
      ),
    ])

    const totalCount = parseInt(countResult[0]?.count ?? '0', 10)

    return { data: raw.map(toLiteratureItem), totalCount }
  } catch (error) {
    throw new Error(
      `Failed to fetch literature items by type "${type}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
