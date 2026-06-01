import { Typography } from '@/common/components/Typography/Typography'
import { cn } from '@/common/utils/cn'
import { getImageUrl } from '@/common/utils/getImageUrl'
import Image from 'next/image'
import Link from 'next/link'

import { LiteratureCardType } from './LiteratureCard.type'

export function LiteratureCard({
  slug,
  title,
  subtitle,
  price,
  currency,
  cover_image,
  className,
}: LiteratureCardType) {
  return (
    <Link
      href={`/literature/${slug}`}
      className={cn(
        'border-primary-grey flex flex-col gap-3 rounded-lg border p-4 shadow-md transition-shadow hover:shadow-lg',
        className,
      )}
    >
      {cover_image ? (
        <Image
          src={getImageUrl(cover_image)}
          alt={title}
          width={300}
          height={400}
          className='aspect-[3/4] w-full max-w-75 rounded-md object-cover'
          priority={false}
        />
      ) : (
        <div className='flex aspect-[3/4] w-full items-center justify-center rounded-md bg-[#f5f5f5]'>
          <span className='text-sm text-gray-400'>Обложка не найдена</span>
        </div>
      )}
      <div className='flex h-full flex-col justify-between gap-2'>
        <div className='flex flex-col'>
          <Typography variant='h3' font='roboto' className='line-clamp-2'>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant='caption' className='text-gray-400'>
              {subtitle}
            </Typography>
          )}
        </div>

        {price !== null && price !== undefined && (
          <div className='bg-indigo-blue w-fit rounded-full px-4 py-2'>
            <Typography variant='body' className='font-bold text-white'>
              {price} {currency}
            </Typography>
          </div>
        )}
      </div>
    </Link>
  )
}
