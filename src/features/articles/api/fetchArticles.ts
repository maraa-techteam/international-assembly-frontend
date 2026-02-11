import { readItems } from '@directus/sdk'

import directus from '../../../common/lib/directus'

export async function fetchArticles() {
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
}
