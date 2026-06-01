import { fetchQuizPage } from '@/common/api/fetchQuizPage'
import { IsAaForMePage } from '@/features/quiz/pages/IsAaForMePage'
import { Metadata } from 'next'

const pageData = await fetchQuizPage()
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageData[0]?.meta_title,
    description: pageData[0]?.meta_description,
    alternates: {
      canonical: '/is-aa-for-me',
    },
  }
}

export default function Page() {
  return <IsAaForMePage title={pageData[0]?.title} text={pageData[0]?.text} />
}
