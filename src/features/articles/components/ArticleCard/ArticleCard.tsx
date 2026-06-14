import { Label } from '@/common/components/Label/Label'
import { Typography } from '@/common/components/Typography/Typography'
import { cn } from '@/common/utils/cn'
import { formatDate } from '@/common/utils/dateFormatter'
import { getImageUrl } from '@/common/utils/getImageUrl'
import Image from 'next/image'
import Link from 'next/link'

import { ArticleCardType } from './ArticleCard.type'

type ArticleCardProps = ArticleCardType

export function ArticleCard({
  title,
  image,
  perex,
  slug,
  date_created,
  className,
  isHighlighted,
}: ArticleCardProps) {
  return (
    <Link
      href={`/news-and-events/${slug}`}
      className={cn(
        'inline-flex flex-col items-start justify-center gap-6 lg:grid lg:grid-cols-2',
        className,
      )}
    >
      {image ? (
        <Image
          src={getImageUrl(image)}
          alt={title}
          width={500}
          height={400}
          className={cn(
            'w-full rounded-lg object-cover',
            isHighlighted && 'aspect-video',
          )}
          priority={false}
        />
      ) : (
        <div className='flex h-64 w-full items-center justify-center rounded-lg bg-[#f5f5f5]'>
          <span className='text-sm text-gray-400'>Картинка не найдена</span>
        </div>
      )}
      <div className='flex flex-col items-start justify-start gap-4'>
        <Label text={formatDate(date_created)} />
        <div className='flex flex-col gap-2'>
          <Typography
            variant={isHighlighted ? 'h2' : 'h3'}
            className={cn('line-clamp-2')}
          >
            {title}
          </Typography>
          <Typography variant='body' className='line-clamp-3'>
            {perex}
          </Typography>
        </div>
      </div>
    </Link>
  )
}
