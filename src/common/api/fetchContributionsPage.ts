import { cache } from 'react'

import { META_FIELDS, PageMetaType, fetchSingleton } from './fetchSingleton'

export type ContributionsProvider = {
  id: string
  name: string
  url?: string
  description?: string
  account?: string
}

export type ContributionsPageType = PageMetaType & {
  title: string
  text: string
  provider: ContributionsProvider[]
}

export const fetchContributionsPage = cache(
  async function fetchContributionsPage() {
    const page = await fetchSingleton<
      Omit<ContributionsPageType, 'provider'> & {
        provider: ContributionsProvider[] | null
      }
    >('contributions_page', [...META_FIELDS, 'title', 'text', 'provider'])

    return { ...page, provider: page.provider ?? [] }
  },
)
