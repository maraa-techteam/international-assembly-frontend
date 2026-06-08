import { Icon } from '@/common/components/Icon/Icon'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'
import Link from 'next/link'

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
        <Link
          href='/'
          className='text-foreground flex flex-row items-center gap-4 self-start'
        >
          <Icon icon='arrow-left' />
          Домой
        </Link>
        <Typography variant='h1'>ААшибка 404</Typography>
      </Section>
      <Section className='lg:max-w-250 lg:pt-0 lg:pr-0' color='white'>
        <Typography variant='body'>Страница не найдена</Typography>
      </Section>
    </>
  )
}
