import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function getHeaderData() {
  const raw = await directus.request(
    readItems('header_menu', {
      fields: [
        'name',
        'href',
        'subNav.name',
        'subNav.href',
        'subNav.description',
      ],
    }),
  )
  return raw.map((item) => {
    return {
      name: item.name,
      href: item.href,
      subNav: item.subNav || [],
    }
  })
}
