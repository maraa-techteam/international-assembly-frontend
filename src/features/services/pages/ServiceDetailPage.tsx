import { BackButton } from '@/common/components/BackButton/BackButton'
import { ContactForm } from '@/common/components/ContactForm/ContactForm'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'

import { fetchService } from '../api/fetchService'
import { ServiceLabels } from '../components/ServiceLabels/ServiceLabels'

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params
  const service = await fetchService(slug)

  if (!service) {
    return (
      <Section color='white'>
        <Typography variant='h1' font='roboto'>
          Служение не найдено
        </Typography>
        <BackButton className='self-start' />
      </Section>
    )
  }

  return (
    <Section color='white' className='w-full lg:max-w-250 lg:pb-12'>
      <BackButton className='self-start' />
      <Typography variant='h1' font='roboto'>
        {service.name}
      </Typography>
      <ServiceLabels service={service} />
      <RichTextPreview htmlContent={service.description} />
      <ContactForm
        endpoint='/api/service-application'
        includeFileUpload
        includeSubject={false}
        presetSubject={`Заявка на служение: ${service.name}`}
      />
    </Section>
  )
}
