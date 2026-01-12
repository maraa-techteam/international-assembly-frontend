import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function fetchGroups(params?: URLSearchParams) {
  const raw = await directus.request(
    readItems(`groups?${params?.toString()}`, {
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
        'schedule',
        'time_zone',
      ],
    }),
  )
  return raw.map((item) => {
    return {
      name: item.name,
      description: item.description,
      country: item.country,
      presence: item.presence,
      digital_address: item.digital_address,
      address: item.address,
      website: item.website,
      youtube: item.youtube,
      telegram: item.telegram,
      contact: item.contact,
      schedule: item.schedule,
      time_zone: item.time_zone,
    }
  })
}
