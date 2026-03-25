import { Typography } from '@/common/components'
import { cn } from '@/common/utils/cn'
import { getImageUrl } from '@/common/utils/getImageUrl'
import Image from 'next/image'
import Link from 'next/link'

import { LiteratureCardType } from './LiteratureCard.type'

export function LiteratureCard({
  id,
  title,
  subtitle,
  author,
  edition_name,
  page_count,
  price,
  currency,
  cover_image,
  className,
}: LiteratureCardType) {
  return (
    <Link
      href={`/literature/${id}`}
      className={cn(
        'flex flex-col gap-3 rounded-lg border border-[#e5e7eb] p-4 transition-shadow hover:shadow-md',
        className,
      )}
    >
      {cover_image ? (
        <Image
          src={getImageUrl(cover_image)}
          alt={title}
          width={300}
          height={400}
          className='aspect-[3/4] w-full rounded-md object-cover'
          priority={false}
        />
      ) : (
        <div className='flex aspect-[3/4] w-full items-center justify-center rounded-md bg-[#f5f5f5]'>
          <span className='text-sm text-gray-400'>Обложка не найдена</span>
        </div>
      )}
      <div className='flex flex-col gap-1'>
        <Typography variant='h3' font='roboto' className='line-clamp-2'>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant='body' className='line-clamp-2 text-gray-500'>
            {subtitle}
          </Typography>
        )}
        {author && (
          <Typography variant='caption' className='text-gray-500'>
            {author}
          </Typography>
        )}
        {edition_name && (
          <Typography variant='caption' className='text-gray-400'>
            {edition_name}
          </Typography>
        )}
        {page_count && (
          <Typography variant='caption' className='text-gray-400'>
            {page_count} стр.
          </Typography>
        )}
        {price !== null && price !== undefined && (
          <Typography variant='body' className='text-primary font-bold'>
            {price} {currency}
          </Typography>
        )}
      </div>
    </Link>
  )
}
