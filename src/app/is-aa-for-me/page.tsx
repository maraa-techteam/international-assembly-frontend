import { fetchQuizPage } from '@/common/api/fetchQuizPage'
import { buildPageMetadata } from '@/config/seo'
import { IsAaForMePage } from '@/features/quiz/pages/IsAaForMePage'
import { Metadata } from 'next'

const pageData = await fetchQuizPage()

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: pageData[0]?.meta_title,
    description: pageData[0]?.meta_description,
    path: '/is-aa-for-me',
    fallbackTitle: 'Подходит ли мне АА?',
  })
}

export default function Page() {
  return <IsAaForMePage title={pageData[0]?.title} text={pageData[0]?.text} />
}
