import { readItems } from '@directus/sdk'
import { SearchParams } from 'next/dist/server/request/search-params'

import directus from '../utils/directus'

export async function fetchGroups(params?: SearchParams) {
  const countries = params?.country
    ? (params.country as string).split(',')
    : undefined

  const presence = params?.presence
    ? (params.presence as string).split(',')
    : undefined

  const schedule_slots = params?.schedule_slots
    ? (params.schedule_slots as string).split(',')
    : undefined

  const searchValue = params?.searchValue

  const page = params?.page ? parseInt(params.page as string) : 1

  const itemsPerPage = params?.limit ? parseInt(params.limit as string) : 10

  const response = await directus.request(
    readItems('groups', {
      limit: itemsPerPage,
      page,
      meta: 'total_count',

      filter: {
        country: countries
          ? {
              _in: countries,
            }
          : undefined,
        presence: presence
          ? {
              _in: presence,
            }
          : undefined,
        schedule_slots: schedule_slots
          ? {
              day: {
                _in: schedule_slots,
              },
            }
          : undefined,
        name: searchValue
          ? {
              _contains: searchValue,
            }
          : undefined,
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

  // When meta is requested, Directus returns { data, meta }
  const raw = Array.isArray(response) ? response : response.data || response
  const meta = Array.isArray(response) ? undefined : response.meta

  const items = raw.map((item) => {
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
      time_zone: item.time_zone,
      schedule_slots: item.schedule_slots,
    }
  })

  return {
    items,
    totalCount: meta?.total_count ?? items.length,
    page,
    limit: itemsPerPage,
  }
}
