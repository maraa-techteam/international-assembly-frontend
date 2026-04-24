import { readItems } from '@directus/sdk'

import directus from '../../../common/lib/directus'
import { ServiceType } from '../types/Service.type'

export async function fetchServices(): Promise<ServiceType[]> {
  try {
    const raw = await directus.request(
      readItems('services', {
        fields: [
          'id',
          'slug',
          'name',
          'description',
          'category',
          'required_sobriety_time',
          'engagement',
        ],
      }),
    )
    return raw.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      description: item.description,
      category: item.category,
      required_sobriety_time: item.required_sobriety_time,
      engagement: item.engagement,
    }))
  } catch (error) {
    throw new Error(
      `Failed to fetch services: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
