import { readItems } from '@directus/sdk'

import directus from '../../../common/lib/directus'

export async function fetchArticles() {
  try {
    return await directus.request(
      readItems('article', {
        fields: [
          'id',
          'slug',
          'title',
          'date_updated',
          'date_created',
          'content',
          'image',
          'perex',
          {
            related_articles: [
              'id',
              {
                related_article_id: ['title', 'perex', 'image', 'date_created'],
              },
            ],
          },
        ],
      }),
    )
  } catch (error) {
    throw new Error(
      `Failed to fetch articles: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
