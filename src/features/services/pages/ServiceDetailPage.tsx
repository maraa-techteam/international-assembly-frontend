import { ContactForm } from '@/common/components/ContactForm/ContactForm'
import { LinkComponent } from '@/common/components/LinkComponent/LinkComponent'
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
        <LinkComponent
          href='/services'
          icon='arrow-left'
          text='Назад'
          color='foreground'
          className='self-start'
          variant='icon-left'
        />
      </Section>
    )
  }

  return (
    <Section color='white' className='w-full lg:max-w-250 lg:pb-12'>
      <LinkComponent
        href='/services'
        icon='arrow-left'
        text='Назад'
        color='foreground'
        className='self-start'
        variant='icon-left'
      />
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
