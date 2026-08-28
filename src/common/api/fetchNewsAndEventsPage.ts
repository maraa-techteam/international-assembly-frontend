import { CMS_REVALIDATE_SECONDS } from '@/config/isr'
import { readSingleton, withOptions } from '@directus/sdk'

import directus from '../lib/directus'
import { unwrapSingleton } from './unwrapSingleton'

export async function fetchNewsAndEventsPage() {
  try {
    const raw = await directus.request(
      withOptions(
        readSingleton('news_and_events_page', {
          fields: [
            'meta_title',
            'meta_description',
            'title',
            'text',
            'highlighted_post.*',
          ],
        }),
        {
          next: {
            revalidate: CMS_REVALIDATE_SECONDS,
            tags: ['cms', 'cms:news_and_events_page'],
          },
        },
      ),
    )
    const item = unwrapSingleton(raw)

    return {
      meta_title: item.meta_title,
      meta_description: item.meta_description,
      title: item.title,
      text: item.text,
      highlighted_post: item.highlighted_post,
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch news and events page data: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
