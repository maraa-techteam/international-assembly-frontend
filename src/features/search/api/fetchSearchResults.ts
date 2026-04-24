import { readItems } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import {
  ArticleSearchResult,
  GroupSearchResult,
  LiteratureSearchResult,
  ServiceSearchResult,
} from '../types/SearchResult.type'

export async function fetchSearchResults(query: string): Promise<{
  articles: ArticleSearchResult[]
  groups: GroupSearchResult[]
  literature: LiteratureSearchResult[]
  services: ServiceSearchResult[]
}> {
  try {
    const [articles, groups, literature, services] = await Promise.all([
      directus.request(
        readItems('article', {
          search: query,
          fields: ['id', 'title', 'perex', 'image', 'date_created', 'slug'],
        }),
      ),
      directus.request(
        readItems('groups', {
          filter: {
            _or: [
              { name: { _icontains: query } },
              { description: { _icontains: query } },
              { country: { _icontains: query } },
              { presence: { _icontains: query } },
            ],
          },
          fields: [
            'id',
            'slug',
            'name',
            'description',
            'country',
            'presence',
            'website',
            'youtube',
            'telegram',
            'whatsapp',
          ],
        }),
      ),
      directus.request(
        readItems('literature_items', {
          search: query,
          fields: [
            'id',
            'slug',
            'title',
            'subtitle',
            'author',
            'cover_image',
            'description',
          ],
        }),
      ),
      directus.request(
        readItems('services', {
          filter: {
            _or: [
              { name: { _icontains: query } },
              { description: { _icontains: query } },
            ],
          },
          fields: [
            'id',
            'slug',
            'name',
            'description',
            'category',
            'required_sobriety_time',
            'engagement',
          ],
        }),
      ),
    ])

    return {
      articles: articles as ArticleSearchResult[],
      groups: groups as GroupSearchResult[],
      literature: literature as LiteratureSearchResult[],
      services: services as ServiceSearchResult[],
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch search results: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
