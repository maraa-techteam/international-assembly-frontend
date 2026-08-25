import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readItems, withOptions } from '@directus/sdk'

import directus from '../../../common/lib/directus'

export async function fetchArticles() {
  try {
    return await directus.request(
      withOptions(
        readItems('article', {
          // Newest first, so the list page and the home page teaser both lead
          // with the most recent news.
          sort: ['-date_created'],
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
                  related_article_id: [
                    'title',
                    'perex',
                    'image',
                    'date_created',
                  ],
                },
              ],
            },
          ],
        }),
        {
          next: {
            revalidate: CMS_REVALIDATE_SECONDS,
            tags: ['cms', 'cms:article'],
          },
        },
      ),
    )
  } catch (error) {
    throw new Error(
      `Failed to fetch articles: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
