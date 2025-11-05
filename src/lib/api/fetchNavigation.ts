import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function getNavigationData() {
  const raw = await directus.request(
    readItems('navigation', {
      fields: [
        'name',
        'href',
        'showInHeader',
        'showInFooter',
        'subNav.name',
        'subNav.href',
        'subNav.description',
        'subNav.isFrequentlyVisited',
      ],
    }),
  )
  return raw.map((item) => {
    return {
      name: item.name,
      href: item.href,
      showInHeader: item.showInHeader,
      showInFooter: item.showInFooter,
      subNav: item.subNav || [],
    }
  })
}
