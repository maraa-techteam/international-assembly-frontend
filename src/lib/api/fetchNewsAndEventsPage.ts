import { readItems } from '@directus/sdk'

import directus from '../utils/directus'

export async function fetchNewsAndEventsPage() {
  const raw = await directus.request(
    readItems('news_and_events_page', {
      fields: [
        'meta_title',
        'meta_description',
        'title',
        'text',
        'highlighted_post.*',
      ],
    }),
  )
  return raw.map((item) => {
    return {
      meta_title: item.meta_title,
      meta_description: item.meta_description,
      title: item.title,
      text: item.text,
      highlighted_post: item.highlighted_post,
    }
  })
}
