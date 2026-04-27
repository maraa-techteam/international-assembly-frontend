import { readItems } from '@directus/sdk'

import directus from '../lib/directus'

export type PayPalProvider = {
  id: 'pay_pal'
  name: string
  url: string
}

export type BankProvider = {
  id: 'bank_account'
  name: string
  account: string
  description?: string
}

export type Provider = PayPalProvider | BankProvider

export type ContributionsPageData = {
  meta_title: string
  meta_description: string
  title: string
  text: string
  provider: Provider[]
}

export async function fetchContributionsPage(): Promise<ContributionsPageData> {
  try {
    const raw = await directus.request(
      readItems('contributions_page', {
        fields: [
          'meta_title',
          'meta_description',
          'title',
          'text',
          { provider: ['id', 'name', 'url', 'account', 'description'] },
        ],
      }),
    )
    const item = raw[0] as ContributionsPageData
    return item
  } catch (error) {
    throw new Error(
      `Failed to fetch contributions page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
