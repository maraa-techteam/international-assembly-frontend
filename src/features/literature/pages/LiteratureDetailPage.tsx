import { Typography } from '@/common/components'
import { Section } from '@/common/layouts/Section/Section'
import { getImageUrl } from '@/common/utils/getImageUrl'
import Image from 'next/image'
import Link from 'next/link'

import { fetchLiteratureItem } from '../api/fetchLiteratureItem'

type LiteratureDetailPageProps = {
  params: Promise<{ id: string }>
}

export async function LiteratureDetailPage({
  params,
}: LiteratureDetailPageProps) {
  const { id } = await params
  const item = await fetchLiteratureItem(id)

  if (!item) {
    return (
      <Section color='white'>
        <Typography variant='h1' font='roboto'>
          Материал не найден
        </Typography>
        <Link href='/literature' className='text-primary underline'>
          ← Вернуться к литературе
        </Link>
      </Section>
    )
  }

  return (
    <Section color='white'>
      <Link href='/literature' className='text-primary underline'>
        ← Вернуться к литературе
      </Link>
      <div className='flex flex-col gap-6 lg:flex-row'>
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
        <div className='flex flex-col gap-3'>
          <Typography variant='h1' font='roboto'>
            {item.title}
          </Typography>
          {item.subtitle && (
            <Typography variant='body' className='text-gray-500'>
              {item.subtitle}
            </Typography>
          )}
          {item.is_approved && (
            <span className='border-primary text-primary inline-flex w-fit items-center rounded-full border px-4 py-1 text-sm'>
              Одобрено
            </span>
          )}
          {item.description && (
            <Typography variant='body'>{item.description}</Typography>
          )}
          <dl className='flex flex-col gap-2 text-sm'>
            {item.author && (
              <div className='flex gap-2'>
                <dt className='font-bold'>Автор:</dt>
                <dd>{item.author}</dd>
              </div>
            )}
            {item.isbn && (
              <div className='flex gap-2'>
                <dt className='font-bold'>ISBN:</dt>
                <dd>{item.isbn}</dd>
              </div>
            )}
            {item.edition_name && (
              <div className='flex gap-2'>
                <dt className='font-bold'>Издание:</dt>
                <dd>{item.edition_name}</dd>
              </div>
            )}
            {item.page_count && (
              <div className='flex gap-2'>
                <dt className='font-bold'>Страниц:</dt>
                <dd>{item.page_count}</dd>
              </div>
            )}
            {item.binding_type && (
              <div className='flex gap-2'>
                <dt className='font-bold'>Переплёт:</dt>
                <dd>{item.binding_type}</dd>
              </div>
            )}
            {item.language && (
              <div className='flex gap-2'>
                <dt className='font-bold'>Язык:</dt>
                <dd>{item.language}</dd>
              </div>
            )}
          </dl>
          {item.price !== null && item.price !== undefined && (
            <Typography variant='h3' font='roboto' className='text-primary'>
              {item.price} {item.currency}
            </Typography>
          )}
        </div>
      </div>
    </Section>
  )
}
