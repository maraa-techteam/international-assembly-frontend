import { Icon, Label, RichTextPreview, Typography } from '@/common/components'
import { cn } from '@/common/utils/cn'
import Link from 'next/link'

import { SearchGroupResultCardType } from './SearchGroupResultCard.type'

type SearchGroupResultCardProps = SearchGroupResultCardType

export function SearchGroupResultCard({
  name,
  description,
  slug,
  country,
  presence,
  website,
  youtube,
  telegram,
  whatsapp,
  className,
}: SearchGroupResultCardProps) {
  return (
    <div
      className={cn('flex flex-col items-start justify-start gap-4', className)}
    >
      <Link href={`/groups/${slug}`}>
        <Typography
          variant='h3'
          font='roboto'
          className='text-primary line-clamp-2'
        >
          {name}
        </Typography>
      </Link>
      {description && (
        <RichTextPreview htmlContent={description} className='rte-clamp' />
      )}
      {(website || youtube || telegram || whatsapp) && (
        <div className='flex flex-wrap items-start gap-4 rounded-xl'>
          {website && (
            <Link
              href={website}
              target='_blank'
              className='text-primary flex items-center gap-2'
            >
              <Icon icon='website' />
              Веб-сайт
            </Link>
          )}
          {youtube && (
            <Link
              href={youtube}
              target='_blank'
              className='text-primary flex items-center gap-2'
            >
              <Icon icon='youtube' />
              YouTube
            </Link>
          )}
          {telegram && (
            <Link
              href={telegram}
              target='_blank'
              className='text-primary flex items-center gap-2'
            >
              <Icon icon='telegram' />
              Telegram
            </Link>
          )}
          {whatsapp && (
            <Link
              href={whatsapp}
              target='_blank'
              className='text-primary flex items-center gap-2'
            >
              <Icon icon='whatsapp' />
              WhatsApp
            </Link>
          )}
        </div>
      )}
      <div className='flex flex-wrap gap-2'>
        {country && <Label className='cursor-default' text={country} />}
        {presence && <Label className='cursor-default' text={presence} />}
      </div>
    </div>
  )
}
