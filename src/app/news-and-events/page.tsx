import { fetchNewsAndEventsPage } from '@/common/api/fetchNewsAndEventsPage'
import { ArticlesListPage } from '@/features/articles'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchNewsAndEventsPage()
  return {
    metadataBase: new URL(process.env.PRODUCTION_FRONTEND_URL || ''),
    title: pageData[0].meta_title + ' | Международная Ассамблея АА',
    description: pageData[0].meta_description,
    alternates: {
      canonical: '/news-and-events',
    },
  }
}

export default async function Page() {
  return <ArticlesListPage />
}
