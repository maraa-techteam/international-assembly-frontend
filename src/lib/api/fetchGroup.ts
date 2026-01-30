import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function fetchGroup(slug: string) {
  const raw = await directus.request(
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
      ],
    }),
  )

  return raw[0]
}
