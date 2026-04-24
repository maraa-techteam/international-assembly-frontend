import { readItems } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import {
  ArticleSearchResult,
  GroupSearchResult,
  LiteratureSearchResult,
} from '../types/SearchResult.type'

export async function fetchSearchResults(query: string): Promise<{
  articles: ArticleSearchResult[]
  groups: GroupSearchResult[]
  literature: LiteratureSearchResult[]
}> {
  try {
    const [articles, groups, literature] = await Promise.all([
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
    ])

    return {
      articles: articles as ArticleSearchResult[],
      groups: groups as GroupSearchResult[],
      literature: literature as LiteratureSearchResult[],
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch search results: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
