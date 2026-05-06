import { fetchLiteraturePage } from '@/common/api/fetchLiteraturePage'
import { LiteraturePage } from '@/features/literature'
import { Metadata } from 'next'

const pageData = await fetchLiteraturePage()

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]
  return {
    title: page.meta_title + ' | Литература АА',
    description: page.meta_description,
  }
}

export default async function Page() {
  return <LiteraturePage />
}
