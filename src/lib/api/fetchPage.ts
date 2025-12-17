import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function getPageData(slug: string) {
  const raw = await directus.request(
    readItems('pages', {
      filter: {
        slug: { _eq: slug },
      },
      fields: [
        'meta_description',
        'meta_title',
        'slug',
        {
          sections: [
            'collection',
            {
              item: [
                '*',
                // Expand article_cards to get full article data
                {
                  article_cards: [
                    '*',
                    {
                      article_id: ['*'], // This gets all fields from the article
                    },
                  ],
                },
                { primary_item: ['*'] },
              ],
            },
          ],
        },
      ],
    }),
  )
  return raw.map((page) => {
    return {
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      slug: page.slug === 'home' ? '/' : page.slug,
      sections: page.sections || [],
    }
  })
}
