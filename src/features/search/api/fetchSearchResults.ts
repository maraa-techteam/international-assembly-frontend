import { readItems, withOptions } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import {
  ArticleSearchResult,
  GroupSearchResult,
  LiteratureSearchResult,
  ServiceSearchResult,
} from '../types/SearchResult.type'

const cacheOptions: RequestInit = { cache: 'no-store' }

export async function fetchSearchResults(query: string): Promise<{
  articles: ArticleSearchResult[]
  groups: GroupSearchResult[]
  literature: LiteratureSearchResult[]
  services: ServiceSearchResult[]
}> {
  try {
    const [articles, groups] = await Promise.all([
      directus.request(
        withOptions(
          readItems('article', {
            search: query,
            fields: ['id', 'title', 'perex', 'image', 'date_created', 'slug'],
          }),
          cacheOptions,
        ),
      ),
      directus.request(
        withOptions(
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
          cacheOptions,
        ),
      ),
      // Literature and services sit behind a work-in-progress page, so their
      // results would link to content that is not published yet. Restore these
      // two requests — and the `literature` / `services` values below — when
      // those sections go live.
      // directus.request(
      //   withOptions(
      //     readItems('literature_items', {
      //       search: query,
      //       fields: [
      //         'id',
      //         'slug',
      //         'title',
      //         'subtitle',
      //         'author',
      //         'cover_image',
      //         'description',
      //         'category',
      //       ],
      //     }),
      //     cacheOptions,
      //   ),
      // ),
      // directus.request(
      //   withOptions(
      //     readItems('services', {
      //       filter: {
      //         _or: [
      //           { name: { _icontains: query } },
      //           { description: { _icontains: query } },
      //         ],
      //       },
      //       fields: [
      //         'id',
      //         'slug',
      //         'name',
      //         'description',
      //         'category',
      //         'required_sobriety_time',
      //         'engagement',
      //       ],
      //     }),
      //     cacheOptions,
      //   ),
      // ),
    ])
    return {
      articles: articles as ArticleSearchResult[],
      groups: groups as GroupSearchResult[],
      literature: [],
      services: [],
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch search results: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
