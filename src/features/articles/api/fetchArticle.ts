import { readItems } from '@directus/sdk'

import directus, { createPreviewDirectus } from '../../../common/lib/directus'

export async function fetchArticle(slug: string, previewToken?: string) {
  const client = previewToken ? createPreviewDirectus(previewToken) : directus
  try {
    const raw = await client.request(
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
    )

    return raw[0]
  } catch (error) {
    throw new Error(
      `Failed to fetch article with slug "${slug}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
