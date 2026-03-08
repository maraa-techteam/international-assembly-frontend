import { readItems } from '@directus/sdk'

import directus from '../lib/directus'

export async function getFrequentlyVisitedLinks() {
  try {
    const raw = await directus.request(
      readItems('sub_nav', {
        fields: ['name', 'href', 'description', 'isFrequentlyVisited'],
      }),
    )
    return raw
      .map((item) => {
        return {
          name: item.name,
          href: item.href,
          description: item.description,
          isFrequentlyVisited: item.isFrequentlyVisited,
        }
      })
      .filter((link) => link.isFrequentlyVisited)
  } catch (error) {
    throw new Error(
      `Failed to fetch frequently visited links: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
