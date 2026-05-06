import { fetchQuizPage } from '@/common/api/fetchQuizPage'
import { IsAaForMePage } from '@/features/quiz'
import { Metadata } from 'next'

const pageData = await fetchQuizPage()
export const metadata: Metadata = {
  title: pageData[0]?.meta_title,
  description: pageData[0]?.meta_description,
}

export default function Page() {
  return (
    <IsAaForMePage
      title={pageData[0]?.meta_title}
      text={pageData[0]?.meta_description}
    />
  )
}
