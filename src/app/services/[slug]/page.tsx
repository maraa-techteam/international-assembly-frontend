import { ServiceDetailPage } from '@/features/services'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Детали служения',
  description:
    'Подробная информация о служении Международной Ассамблеи и форма подачи заявки с прикреплением PDF.',
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <ServiceDetailPage params={params} />
}
