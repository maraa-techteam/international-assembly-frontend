import { aggregate, readItems } from '@directus/sdk'
import { SearchParams } from 'next/dist/server/request/search-params'

import directus from '../../../common/lib/directus'
import { ServiceType } from '../types/Service.type'

export async function fetchServices(
  params?: SearchParams,
): Promise<{ data: ServiceType[]; totalCount: number }> {
  const page = params?.page ? parseInt(params.page as string, 10) : 1
  const itemsPerPage = params?.limit ? parseInt(params.limit as string, 10) : 10

  try {
    const [raw, countResult] = await Promise.all([
      directus.request(
        readItems('services', {
          limit: itemsPerPage,
          page,
          fields: [
            'id',
            'name',
            'description',
            'category',
            'required_sobriety_time',
            'engagement',
            'slug',
          ],
        }),
      ),
      directus.request(
        aggregate('services', {
          aggregate: { count: '*' },
        }),
      ),
    ])

    const totalCount = parseInt(countResult[0]?.count ?? '0', 10)

    return {
      totalCount,
      data: raw.map((item) => ({
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
      })),
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch services: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
