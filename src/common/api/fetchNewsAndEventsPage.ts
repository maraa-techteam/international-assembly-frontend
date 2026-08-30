import { Article } from '@/features/articles/types/Article.type'
import { cache } from 'react'

import { META_FIELDS, PageMetaType, fetchSingleton } from './fetchSingleton'

export type NewsAndEventsPageType = PageMetaType & {
  title: string
  text: string
  highlighted_post: Article | null
}

export const fetchNewsAndEventsPage = cache(
  async function fetchNewsAndEventsPage() {
    return fetchSingleton<NewsAndEventsPageType>('news_and_events_page', [
      ...META_FIELDS,
      'title',
      'text',
      'highlighted_post.*',
    ])
  },
)
