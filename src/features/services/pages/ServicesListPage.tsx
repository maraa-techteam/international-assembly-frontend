import { Pagination, RichTextPreview, Typography } from '@/common/components'
import { Section } from '@/common/layouts'
import { SearchParams } from 'next/dist/server/request/search-params'

import { fetchServices } from '../api/fetchServices'
import { ServiceCard } from '../components/ServiceCard/ServiceCard'

export async function ServicesListPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
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
          <Pagination
            fetchedCount={services.length}
            pageSize={10}
            totalCount={services.length}
          />
        </>
      )}
    </Section>
  )
}
