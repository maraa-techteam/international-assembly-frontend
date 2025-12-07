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
              item: ['*', { article_cards: ['*', { image: 'id' }] }],
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
