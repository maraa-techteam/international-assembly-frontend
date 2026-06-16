import { Typography } from '@/common/components/Typography/Typography'
import { cn } from '@/common/utils/cn'
import { getImageUrl } from '@/common/utils/getImageUrl'
import Image from 'next/image'
import Link from 'next/link'

import { SearchLiteratureCardProps } from './SearchLiteratureCard.type'

export function SearchLiteratureCard({
  title,
  subtitle,
  author,
  cover_image,
  description,
  url,
  className,
}: SearchLiteratureCardProps) {
  return (
    <Link
      href={url}
      className={cn(
        'inline-flex max-w-200 flex-col items-start justify-start gap-4 lg:flex-row lg:gap-6',
        className,
      )}
    >
      {cover_image ? (
        <Image
          src={getImageUrl(cover_image)}
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
        {author && (
          <Typography variant='body' className='text-gray-500'>
            {author}
          </Typography>
        )}
        <Typography variant='h3' className='line-clamp-2'>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant='body' className='line-clamp-1 text-gray-500'>
            {subtitle}
          </Typography>
        )}
        <Typography variant='body' className='line-clamp-3'>
          {description}
        </Typography>
      </div>
    </Link>
  )
}
