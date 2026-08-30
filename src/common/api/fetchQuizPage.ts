import { cache } from 'react'

import { META_FIELDS, PageMetaType, fetchSingleton } from './fetchSingleton'

export type QuizPageType = PageMetaType & {
  title: string
  text: string
}

export const fetchQuizPage = cache(async function fetchQuizPage() {
  return fetchSingleton<QuizPageType>('quiz_page', [
    ...META_FIELDS,
    'title',
    'text',
  ])
})
