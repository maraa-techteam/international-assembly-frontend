import { readItems } from '@directus/sdk'

import directus, { createPreviewDirectus } from '../../../common/lib/directus'

export async function fetchGroup(slug: string, previewToken?: string) {
  const client = previewToken ? createPreviewDirectus(previewToken) : directus
  try {
    const raw = await client.request(
      readItems('groups', {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        fields: [
          'name',
          'description',
          'country',
          'presence',
          'digital_address',
          'address',
          'website',
          'youtube',
          'telegram',
          'contact',
          'time_zone',
          { schedule_slots: ['day', 'time'] },
          { images: ['id', 'directus_files_id'] },
        ],
      }),
    )

    return raw[0]
  } catch (error) {
    throw new Error(
      `Failed to fetch group with slug "${slug}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
