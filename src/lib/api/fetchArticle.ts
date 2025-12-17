import { readItems } from '@directus/sdk'

import directus from '../utils/directus'
import { transliterate } from '../utils/transliterate'

export async function fetchArticle(slug: string) {
  const raw = await directus.request(
    readItems('article', {
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

  return raw.find((item) => {
    return transliterate(item.title).toLowerCase().replace(/\s+/g, '-') === slug
  })
}
