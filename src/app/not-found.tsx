import { LinkComponent } from '@/common/components/LinkComponent/LinkComponent'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'

export async function generateMetadata() {
  return {
    title: 'Страница не найдена | Международная Ассамблея АА',
    description:
      'К сожалению, запрашиваемая страница не найдена на сайте Международной Ассамблеи АА.',
  }
}

export default function NotFound() {
  return (
    <>
      <Section className='py-0' color='white'>
        <LinkComponent
          text='Домой'
          href='/'
          variant='icon-left'
          icon='arrow-left'
          className='text-foreground self-start'
        />
        <Typography variant='h1'>ААшибка 404</Typography>
      </Section>
      <Section className='lg:max-w-250 lg:pt-0 lg:pr-0' color='white'>
        <Typography variant='body'>Страница не найдена</Typography>
      </Section>
    </>
  )
}
