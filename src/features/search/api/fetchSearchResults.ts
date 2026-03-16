import { readItems } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import {
  ArticleSearchResult,
  GroupSearchResult,
} from '../types/SearchResult.type'

export async function fetchSearchResults(query: string): Promise<{
  articles: ArticleSearchResult[]
  groups: GroupSearchResult[]
}> {
  try {
    const [articles, groups] = await Promise.all([
      directus.request(
        readItems('article', {
          search: query,
          fields: ['id', 'slug', 'title', 'perex', 'image', 'date_created'],
        }),
      ),
      directus.request(
        readItems('groups', {
          search: query,
          fields: [
            'id',
            'slug',
            'name',
            'country',
            'presence',
            'website',
            'youtube',
            'telegram',
            'whatsapp',
          ],
        }),
      ),
    ])

    return {
      articles: articles as ArticleSearchResult[],
      groups: groups as GroupSearchResult[],
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch search results: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
