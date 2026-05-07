import { fetchServicesPage } from '@/common/api/fetchServicesPage'
import { RichTextPreview, Typography } from '@/common/components'
import { Section } from '@/common/layouts'

import { fetchServices } from '../api/fetchServices'
import { ServiceCard } from '../components/ServiceCard/ServiceCard'

export async function ServicesListPage() {
  const pageData = await fetchServicesPage()
  const services = await fetchServices()

  return (
    <Section color='white' className='w-full lg:max-w-250 lg:pb-12'>
      <Typography variant='h1' font='roboto'>
        {pageData[0]?.title}
      </Typography>
      <RichTextPreview
        htmlContent={pageData[0]?.text}
        className='mt-4 lg:max-w-200'
      />
      {services.length === 0 ? (
        <Typography variant='body' className='text-gray-500'>
          Служения пока отсутствуют.
        </Typography>
      ) : (
        <div className='flex w-full flex-col gap-4'>
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      )}
    </Section>
  )
}
