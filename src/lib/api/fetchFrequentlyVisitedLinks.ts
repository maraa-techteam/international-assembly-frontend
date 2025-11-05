import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function getFrequentlyVisitedLinks() {
  const raw = await directus.request(
    readItems('sub_nav', {
      fields: ['name', 'href', 'description', 'isFrequentlyVisited'],
    }),
  )
  return raw.map((item) => {
    return {
      name: item.name,
      href: item.href,
      description: item.description,
      isFrequentlyVisited: item.isFrequentlyVisited,
    }
  })
}
