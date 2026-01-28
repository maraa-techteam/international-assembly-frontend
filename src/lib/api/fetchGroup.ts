import { readItems } from '@directus/sdk'

import directus from '../utils/directus'
import { transliterate } from '../utils/transliterate'

export async function fetchGroup(slug: string) {
  const raw = await directus.request(
    readItems('groups', {
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

  return raw.find((group) => {
    return transliterate(group.name).toLowerCase().replace(/\s+/g, '-') === slug
  })
}
