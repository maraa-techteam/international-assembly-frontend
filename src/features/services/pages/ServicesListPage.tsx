import { fetchServicesPage } from '@/common/api/fetchServicesPage'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'

import { fetchServices } from '../api/fetchServices'
import { ServiceCard } from '../components/ServiceCard/ServiceCard'

export async function ServicesListPage() {
  const [page, services] = await Promise.all([
    fetchServicesPage(),
    fetchServices(),
  ])

  return (
    <Section color='white' className='w-full lg:max-w-250 lg:pb-12'>
      <Typography variant='h1'>{page?.title}</Typography>
      <RichTextPreview htmlContent={page?.text} className='mt-4 lg:max-w-200' />
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
