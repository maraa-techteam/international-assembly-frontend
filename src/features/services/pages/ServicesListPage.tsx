import { fetchServicesPage } from '@/common/api/fetchServicesPage'
import { Pagination, RichTextPreview, Typography } from '@/common/components'
import { Section } from '@/common/layouts'
import { SearchParams } from 'next/dist/server/request/search-params'

import { fetchServices } from '../api/fetchServices'
import { ServiceCard } from '../components/ServiceCard/ServiceCard'

const pageData = await fetchServicesPage()

export async function ServicesListPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const page = pageData[0]
  const { data: services, totalCount } = await fetchServices(await searchParams)

  return (
    <Section color='white' className='w-full lg:max-w-250'>
      <Typography variant='h1' font='roboto'>
        {page?.title ?? 'Служения'}
      </Typography>
      {page?.text && <RichTextPreview htmlContent={page.text} />}

      {totalCount === 0 ? (
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
            totalCount={totalCount}
          />
        </>
      )}
    </Section>
  )
}
