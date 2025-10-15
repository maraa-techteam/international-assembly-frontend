import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function getSocials() {
  const raw = await directus.request(
    readItems('social_media', {
      fields: ['name', 'href', 'icon'],
    }),
  )
  return raw.map((item) => {
    return {
      name: item.name,
      href: item.href,
      icon: item.icon,
    }
  })
}
