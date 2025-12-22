import { cn } from '@/lib/utils/cn'
import { formatDate } from '@/lib/utils/dateFormatter'
import { getImageUrl } from '@/lib/utils/getImageUrl'
import { transliterate } from '@/lib/utils/transliterate'
import { ArticleCard as ArticleCardProps } from '@/types/components'
import { Label, Typography } from '@/ui/components'
import Image from 'next/image'

export function ArticleCard({
  title,
  image,
  perex,
  date_created,
  className,
  isHighlighted,
}: ArticleCardProps) {
  const slug = transliterate(title).toLowerCase().replace(/\s+/g, '-')
  return (
    <a
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
            font='roboto'
          >
            {title}
          </Typography>
          <Typography variant='body' className='line-clamp-3' font='roboto'>
            {perex}
          </Typography>
        </div>
      </div>
    </a>
  )
}
