import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function fetchArticle(slug: string) {
  const raw = await directus.request(
    readItems('article', {
      filter: {
        slug: {
          _eq: slug,
        },
      },
      fields: [
        'title',
        'date_updated',
        'date_created',
        'content',
        'image',
        'perex',
        {
          related_articles: [
            '*', // Gets junction table fields (id, article_id, related_article_id)
            {
              related_article_id: ['*'], // Gets the actual related article data
            },
          ],
        },
      ],
    }),
  )

  return raw[0]
}
