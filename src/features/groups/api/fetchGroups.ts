import type { SearchParams } from '@/common/types/SearchParams'
import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { aggregate, readItems, withOptions } from '@directus/sdk'

import directus from '../../../common/lib/directus'

export async function fetchGroups(params?: SearchParams) {
  const countries = params?.country

  const presence = params?.presence

  const schedule_slots = params?.schedule_slots

  const searchValue = params?.searchValue

  const page = params?.page ? parseInt(params.page as string) : 1

  const itemsPerPage = params?.limit ? parseInt(params.limit as string) : 10

  const filter = {
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
          // `_icontains`, not `_contains`: the latter is case-sensitive, so
          // typing a name in lower case matched nothing.
          _icontains: searchValue,
        }
      : undefined,
  }

  const cacheOptions = {
    next: {
      revalidate: CMS_REVALIDATE_SECONDS,
      tags: ['cms', 'cms:groups'],
    },
  }

  try {
    const [raw, countResult] = await Promise.all([
      directus.request(
        withOptions(
          readItems('groups', {
            limit: itemsPerPage,
            page,
            filter,
            fields: [
              'id',
              'slug',
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
          cacheOptions,
        ),
      ),
      directus.request(
        withOptions(
          aggregate('groups', {
            aggregate: { count: '*' },
            query: { filter },
          }),
          cacheOptions,
        ),
      ),
    ])

    const totalCount = parseInt(countResult[0]?.count ?? '0', 10)

    const data = raw.map((item) => {
      return {
        id: item.id,
        slug: item.slug,
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

    return { data, totalCount }
  } catch (error) {
    throw new Error(
      `Failed to fetch groups: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
