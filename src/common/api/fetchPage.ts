import { readItems } from '@directus/sdk'

import directus from '../lib/directus'

export async function fetchPage(collection: string) {
  try {
    const raw = await directus.request(
      readItems(collection, {
        fields: [
          'meta_title',
          'meta_description',
          'title',
          'text',
          'additional_link',
          'image',
          'button_left',
          'button_right',
          'rich_text',
          'faq',
        ],
      }),
    )
    return raw.map((item) => {
      return {
        meta_title: item.meta_title,
        meta_description: item.meta_description,
        title: item.title,
        text: item.text,
        additional_link: item.additional_link,
        image: item.image,
        button_left: item.button_left,
        button_right: item.button_right,
        rich_text: item.rich_text,
        faq: item.faq,
      }
    })
  } catch (error) {
    throw new Error(
      `Failed to fetch page data for collection "${collection}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
