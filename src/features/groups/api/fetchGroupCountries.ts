import { readItems } from '@directus/sdk'

import directus from '../../../common/lib/directus'

export async function fetchGroupCountries(): Promise<string[]> {
  try {
    const raw = await directus.request(
      readItems('groups', {
        limit: -1,
        fields: ['country'],
      }),
    )

    return [...new Set(raw.map((item) => item.country).filter(Boolean))]
  } catch (error) {
    throw new Error(
      `Failed to fetch group countries: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
