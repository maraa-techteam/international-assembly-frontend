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
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-lg bg-[#f5f5f5]',
          isHighlighted ? 'aspect-video' : 'aspect-[3/2]',
        )}
      >
        {image ? (
          <Image
            src={getImageUrl(image)}
            alt={title}
            fill
            sizes={
              isHighlighted
                ? '(min-width: 1024px) 50vw, 100vw'
                : '(min-width: 1024px) 25vw, 100vw'
            }
            className='object-cover object-top'
            priority={false}
          />
        ) : (
          <span className='absolute inset-0 flex items-center justify-center text-sm text-gray-400'>
            Картинка не найдена
          </span>
        )}
      </div>
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
