import { readItems } from '@directus/sdk'

import directus from '../lib/directus'

export async function getNavigationData() {
  try {
    const raw = await directus.request(
      readItems('navigation', {
        fields: [
          'name',
          'href',
          'showInHeader',
          'showInFooter',
          {
            subNav: ['name', 'href', 'description', 'isFrequentlyVisited'],
          },
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
  } catch (error) {
    throw new Error(
      `Failed to fetch navigation data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
