import { readItems } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import { LiteratureItem } from '../types/LiteratureItem.type'

export async function fetchLiteratureItem(
  slug: string,
): Promise<LiteratureItem | null> {
  try {
    const raw = await directus.request(
      readItems('literature_items', {
        filter: { slug: { _eq: slug } },
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
        limit: 1,
      }),
    )

    if (!raw[0]) return null

    const item = raw[0]
    return {
      id: item.id,
      isbn: item.isbn ?? null,
      slug: item.slug,
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
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch literature item with slug "${slug}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
