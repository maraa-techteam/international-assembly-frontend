import { readItems } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import { ServiceType } from '../types/Service.type'

export async function fetchService(slug: string): Promise<ServiceType | null> {
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
      category: Array.isArray(item.category)
        ? item.category.filter(
            (value): value is string => typeof value === 'string',
          )
        : [],
      required_sobriety_time:
        typeof item.required_sobriety_time === 'string'
          ? item.required_sobriety_time
          : null,
      engagement: Array.isArray(item.engagement)
        ? item.engagement.filter(
            (value): value is string => typeof value === 'string',
          )
        : [],
      slug: item.slug,
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch service with slug "${slug}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
