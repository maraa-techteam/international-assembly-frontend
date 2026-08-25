import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readItems, withOptions } from '@directus/sdk'
import { cache } from 'react'

import directus from '../../../common/lib/directus'

export const fetchArticle = cache(async function fetchArticle(slug: string) {
  try {
    const raw = await directus.request(
      withOptions(
        readItems('article', {
          filter: {
            slug: {
              _eq: slug,
            },
          },
          fields: [
            'id',
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
        {
          next: {
            revalidate: CMS_REVALIDATE_SECONDS,
            tags: ['cms', 'cms:article', `cms:article:${slug}`],
          },
        },
      ),
    )

    return raw[0]
  } catch (error) {
    throw new Error(
      `Failed to fetch article with slug "${slug}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
})
