import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function fetchHomePage() {
  const raw = await directus.request(
    readItems('home_page', {
      fields: ['meta_title', 'meta_description'],
    }),
  )
  return raw.map((item) => {
    return {
      meta_title: item.meta_title,
      meta_description: item.meta_description,
    }
  })
}
