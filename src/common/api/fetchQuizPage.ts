import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readItems, withOptions } from '@directus/sdk'

import directus from '../lib/directus'

export async function fetchQuizPage() {
  try {
    const raw = await directus.request(
      withOptions(
        readItems('quiz_page', {
          fields: ['meta_title', 'meta_description', 'title', 'text'],
        }),
        {
          next: {
            revalidate: CMS_REVALIDATE_SECONDS,
            tags: ['cms', 'cms:quiz_page'],
          },
        },
      ),
    )
    return raw.map((item) => {
      return {
        meta_title: item.meta_title,
        meta_description: item.meta_description,
        title: item.title,
        text: item.text,
      }
    })
  } catch (error) {
    throw new Error(
      `Failed to fetch quiz page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
