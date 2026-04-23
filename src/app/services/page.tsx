import { ServicesListPage } from '@/features/services'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Служения',
  description:
    'Список актуальных служений Международной Ассамблеи: направления, вовлеченность и требования к сроку трезвости.',
}

export default async function Page() {
  return <ServicesListPage />
}
