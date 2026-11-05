import { readItems, withOptions } from '@directus/sdk'
import { cache } from 'react'

import directus from '../../../common/lib/directus'
import { ServiceType } from '../types/Service.type'
import { SERVICE_FIELDS } from './fetchServices'

export const fetchService = cache(async function fetchService(
  slug: string,
): Promise<ServiceType | null> {
  try {
    const raw = await directus.request(
      withOptions(
        readItems('services', {
          filter: {
            slug: {
              _eq: slug,
            },
          },
          fields: SERVICE_FIELDS,
          limit: 1,
        }),
        { cache: 'no-store' },
      ),
    )

    if (!raw[0]) return null

    return raw[0] as ServiceType
  } catch (error) {
    throw new Error(
      `Failed to fetch service with slug "${slug}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
})
