import { Pagination, Typography } from '@/common/components'
import { Section } from '@/common/layouts'
import { Metadata } from 'next'
import { Suspense } from 'react'

import { fetchServices } from '../api/fetchServices'
import { ServiceCard } from '../components/ServiceCard/ServiceCard'

export default async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Служения',
    description:
      'Узнайте больше о служениях и подайте заявку на участие в них.',
  }
}

export async function ServicesListPage() {
  const services = await fetchServices()

  return (
    <Section color='white' className='w-full lg:max-w-250'>
      <Typography variant='h1' font='roboto'>
        Служения
      </Typography>
      <Typography variant='body'>
        Здесь вы можете найти актуальные вакансии на служения.
      </Typography>
      {services.length === 0 ? (
        <Typography variant='body' className='text-gray-500'>
          Служения пока отсутствуют.
        </Typography>
      ) : (
        <>
          <div className='flex w-full flex-col gap-4'>
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
          <Suspense>
            <Pagination
              fetchedCount={services.length}
              pageSize={10}
              totalCount={services.length}
            />
          </Suspense>
        </>
      )}
    </Section>
  )
}
