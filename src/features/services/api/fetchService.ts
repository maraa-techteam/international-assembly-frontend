import { readItems } from '@directus/sdk'
import { cache } from 'react'

import directus from '../../../common/lib/directus'
import { ServiceType } from '../types/Service.type'

export const fetchService = cache(async function fetchService(
  slug: string,
): Promise<ServiceType | null> {
  try {
    const raw = await directus.request(
      readItems('services', {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        fields: [
          'id',
          'name',
          'description',
          'category',
          'required_sobriety_time',
          'engagement',
          'slug',
        ],
        limit: 1,
      }),
    )

    if (!raw[0]) return null

    const item = raw[0]

    return {
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      required_sobriety_time: item.required_sobriety_time,
      engagement: item.engagement,
      slug: item.slug,
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch service with slug "${slug}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
})
