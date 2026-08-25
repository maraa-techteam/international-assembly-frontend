import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readItems, withOptions } from '@directus/sdk'

import directus from '../lib/directus'

export type ContributionsProvider = {
  id: string
  name: string
  url?: string
  description?: string
  account?: string
}

export type ContributionsPageData = {
  id: string
  meta_title: string
  meta_description: string
  title: string
  text: string
  provider: ContributionsProvider[]
}

export async function fetchContributionsPage() {
  try {
    const raw = await directus.request(
      withOptions(
        readItems('contributions_page', {
          fields: [
            'id',
            'meta_title',
            'meta_description',
            'title',
            'text',
            'provider',
          ],
        }),
        {
          next: {
            revalidate: CMS_REVALIDATE_SECONDS,
            tags: ['cms', 'cms:contributions_page'],
          },
        },
      ),
    )
    return raw.map((item): ContributionsPageData => {
      return {
        id: item.id as string,
        meta_title: item.meta_title as string,
        meta_description: item.meta_description as string,
        title: item.title as string,
        text: item.text as string,
        provider: (item.provider as ContributionsProvider[]) ?? [],
      }
    })
  } catch (error) {
    throw new Error(
      `Failed to fetch contributions page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
