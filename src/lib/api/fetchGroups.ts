import { readItems } from '@directus/sdk'
import { SearchParams } from 'next/dist/server/request/search-params'

import directus from '../utils/directus'

export async function fetchGroups(params?: SearchParams) {
  // Convert comma-separated strings to arrays
  const countries = params?.country
    ? (params.country as string).split(',')
    : undefined

  const presences = params?.presence
    ? (params.presence as string).split(',')
    : undefined

  const schedules = params?.schedule
    ? (params.schedule as string).split(',')
    : undefined

  const raw = await directus.request(
    readItems('groups', {
      filter: {
        country: countries
          ? {
              _in: countries,
            }
          : undefined,
        presence: presences
          ? {
              _in: presences,
            }
          : undefined,
        // schedule: schedules
        //   ? {
        //       _and: schedules.map((day) => ({
        //         _contains: {
        //           [day]: [{}],
        //         },
        //       })),
        //     }
        //   : undefined,
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
        'schedule',
        'time_zone',
        { schedule_slots: ['day', 'time'] },
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
      schedule_slots: item.schedule_slots,
    }
  })
}
