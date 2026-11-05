import { fetchQuizPage } from '@/common/api/fetchQuizPage'
import { buildPageMetadata } from '@/config/seo'
import { IsAaForMePage } from '@/features/quiz/pages/IsAaForMePage'
import { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({ path: '/is-aa-for-me' })

export default async function Page() {
  const page = await fetchQuizPage()

  return <IsAaForMePage title={page?.title} text={page?.text} />
}
