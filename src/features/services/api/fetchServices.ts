import { readItems, withOptions } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import { ServiceType } from '../types/Service.type'

export const SERVICE_FIELDS = [
  'id',
  'slug',
  'name',
  'description',
  'category',
  'required_sobriety_time',
  'engagement',
]

export async function fetchServices(): Promise<ServiceType[]> {
  try {
    const raw = await directus.request(
      withOptions(
        readItems('services', {
          fields: SERVICE_FIELDS,
        }),
        { cache: 'no-store' },
      ),
    )

    return raw as ServiceType[]
  } catch (error) {
    throw new Error(
      `Failed to fetch services: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
