import { Label, Typography } from '@/common/components'
import { cn } from '@/common/utils/cn'
import { formatDate } from '@/common/utils/dateFormatter'
import { getImageUrl } from '@/common/utils/getImageUrl'
import Image from 'next/image'

import { SearchResultCardType } from './SearchResultCard.type'

type SearchResultCardProps = SearchResultCardType

export function SearchResultCard({
  title,
  image,
  perex,
  slug,
  date_created,
  className,
}: SearchResultCardProps) {
  return (
    <a
      href={`/news-and-events/${slug}`}
      className={cn(
        'inline-flex flex-col items-start justify-start gap-4 lg:flex-row lg:gap-6',
        className,
      )}
    >
      {image ? (
        <Image
          src={getImageUrl(image)}
          alt={title}
          width={240}
          height={160}
          className='w-full rounded-lg object-cover lg:w-60 lg:shrink-0'
          priority={false}
        />
      ) : (
        <div className='flex h-40 w-full items-center justify-center rounded-lg bg-[#f5f5f5] lg:w-60 lg:shrink-0'>
          <span className='text-sm text-gray-400'>Картинка не найдена</span>
        </div>
      )}
      <div className='flex flex-col items-start justify-start gap-2'>
        <Label text={formatDate(date_created)} />
        <Typography variant='h3' font='roboto' className='line-clamp-2'>
          {title}
        </Typography>
        <Typography variant='body' font='roboto' className='line-clamp-3'>
          {perex}
        </Typography>
      </div>
    </a>
  )
}
