import { LinkComponent, Typography } from '@/common/components'
import { Section } from '@/common/layouts/Section/Section'
import { getImageUrl } from '@/common/utils/getImageUrl'
import Image from 'next/image'

import { fetchLiteratureItem } from '../api/fetchLiteratureItem'

type LiteratureDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function LiteratureDetailPage({
  params,
}: LiteratureDetailPageProps) {
  const { slug } = await params
  const item = await fetchLiteratureItem(slug)

  if (!item) {
    return (
      <Section color='white'>
        <Typography variant='h1' font='roboto'>
          Материал не найден
        </Typography>
        <LinkComponent
          href='/literature'
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
    <Section className='max-w-250' color='white'>
      <LinkComponent
        href='/literature'
        icon='arrow-left'
        text='Назад'
        color='foreground'
        className='self-start'
        variant='icon-left'
      />
      <div className='flex flex-col gap-6 lg:flex-row'>
        <div className='flex flex-col gap-3'>
          <Typography variant='h1' font='roboto'>
            {item.title}
          </Typography>
          {item.subtitle && (
            <Typography variant='body' className='text-gray-500'>
              {item.subtitle}
            </Typography>
          )}
          {item.price !== null && item.price !== undefined && (
            <div className='bg-indigo-blue w-fit rounded-full px-4 py-2'>
              <Typography variant='body' className='font-bold text-white'>
                {item.price} {item.currency}
              </Typography>
            </div>
          )}
          {item.description && (
            <Typography variant='body'>{item.description}</Typography>
          )}
          {item.is_approved && (
            <Typography variant='caption' className='text-primary'>
              Одобрено конференцией
            </Typography>
          )}
          <div className='bg-light-blue flex flex-col items-start gap-4 rounded-2xl p-4'>
            <Typography variant='h3'>Купить</Typography>
            <Typography variant='body'>
              Для покупки контактируйте довереное лицо: Анатолий Б.
            </Typography>
            <LinkComponent
              text={'+491701295235'}
              icon='phone'
              href='tel:+491701295235'
              variant={'icon-left'}
            />
            <LinkComponent
              text={'secretarymaraa@gmail.com'}
              href={'mailto:secretarymaraa@gmail.com'}
              icon='email'
              variant={'icon-left'}
            />
          </div>
        </div>
        <div className='w-full lg:max-w-xs'>
          {item.cover_image ? (
            <Image
              src={getImageUrl(item.cover_image)}
              alt={item.title}
              width={300}
              height={400}
              className='aspect-[3/4] w-full rounded-lg object-cover'
              priority
            />
          ) : (
            <div className='flex aspect-[3/4] w-full items-center justify-center rounded-lg bg-[#f5f5f5]'>
              <span className='text-sm text-gray-400'>Обложка не найдена</span>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
