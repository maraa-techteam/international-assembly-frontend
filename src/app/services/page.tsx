import { ServicesListPage } from '@/features/services'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Служения',
    description:
      'Узнайте больше о служениях и подайте заявку на участие в них.',
  }
}

export default async function Page() {
  return <ServicesListPage />
}
