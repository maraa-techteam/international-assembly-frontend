import { cn } from '@/lib/utils/cn'
import imageLoader from '@/lib/utils/getImageUrl'
import { ArticleCardType } from '@/types/components'
import { Label, Typography } from '@/ui/components'
import Image from 'next/image'

export function ArticleCard({
  title,
  image,
  text,
  publishedAt,
  href,
}: ArticleCardType) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex max-w-[800px] flex-col items-start justify-center gap-6 lg:flex-row',
      )}
    >
      {image ? (
        <Image
          src={imageLoader(image)}
          alt={title}
          width={500}
          height={400}
          className='w-full max-w-md min-w-[250px] rounded-lg object-cover'
          priority={false}
        />
      ) : (
        <div className='flex h-64 w-full min-w-[250px] items-center justify-center rounded-lg bg-[#f5f5f5]'>
          <span className='text-sm text-gray-400'>Картинка не найдена</span>
        </div>
      )}
      <div className='flex flex-col items-start justify-start gap-4'>
        <Label text={publishedAt} />
        <div className='flex flex-col gap-2'>
          <Typography variant='h3' className='line-clamp-2' font='roboto'>
            {title}
          </Typography>
          <Typography variant='body' className='line-clamp-3' font='roboto'>
            {text}
          </Typography>
        </div>
      </div>
    </a>
  )
}
