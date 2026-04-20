import { aggregate, readItems } from '@directus/sdk'
import { SearchParams } from 'next/dist/server/request/search-params'

import directus from '../../../common/lib/directus'
import {
  LiteratureItem,
  LiteratureItemType,
} from '../types/LiteratureItem.type'

const PAGE_SIZE = 10

export async function fetchLiteratureItemsByType(
  type: LiteratureItemType,
  params?: SearchParams,
): Promise<{ data: LiteratureItem[]; totalCount: number }> {
  const page = params?.page ? parseInt(params.page as string) : 1
  const limit = params?.limit ? parseInt(params.limit as string) : PAGE_SIZE

  const filter = { item_type: { _eq: type } }

  try {
    const [raw, countResult] = await Promise.all([
      directus.request(
        readItems('literature_items', {
          filter,
          limit,
          page,
          fields: [
            'id',
            'slug',
            'isbn',
            'title',
            'subtitle',
            'description',
            'item_type',
            'language',
            'binding_type',
            'page_count',
            'edition_name',
            'price',
            'currency',
            'is_approved',
            'author',
            'cover_image',
          ],
        }),
      ),
      directus.request(
        aggregate('literature_items', {
          aggregate: { count: '*' },
          query: { filter },
        }),
      ),
    ])

    const totalCount = parseInt(countResult[0]?.count ?? '0', 10)

    const data = raw.map((item) => ({
      id: item.id,
      slug: item.slug,
      isbn: item.isbn ?? null,
      title: item.title,
      subtitle: item.subtitle ?? null,
      description: item.description ?? null,
      item_type: item.item_type,
      language: item.language ?? null,
      binding_type: item.binding_type ?? null,
      page_count: item.page_count ?? null,
      edition_name: item.edition_name ?? null,
      price: item.price ?? null,
      currency: item.currency ?? null,
      is_approved: item.is_approved ?? false,
      author: item.author ?? null,
      cover_image: item.cover_image ?? null,
    }))

    return { data, totalCount }
  } catch (error) {
    throw new Error(
      `Failed to fetch literature items by type "${type}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
