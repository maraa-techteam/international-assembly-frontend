import { readItems } from '@directus/sdk'

import directus from '../lib/directus'

export async function fetchContactsPage() {
  try {
    const raw = await directus.request(
      readItems('contacts_page', {
        fields: [
          'meta_title',
          'meta_description',
          'title',
          'text',
          'secretary_email',
        ],
      }),
    )
    return raw.map((item) => {
      return {
        meta_title: item.meta_title,
        meta_description: item.meta_description,
        title: item.title,
        text: item.text,
        secretary_email: item.secretary_email,
      }
    })
  } catch (error) {
    throw new Error(
      `Failed to fetch contacts page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
