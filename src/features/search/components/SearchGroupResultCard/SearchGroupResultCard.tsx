import { Label, Typography } from '@/common/components'
import { cn } from '@/common/utils/cn'

import { SearchGroupResultCardType } from './SearchGroupResultCard.type'

type SearchGroupResultCardProps = SearchGroupResultCardType

export function SearchGroupResultCard({
  name,
  description,
  slug,
  country,
  presence,
  className,
}: SearchGroupResultCardProps) {
  return (
    <a
      href={`/groups/${slug}`}
      className={cn(
        'inline-flex flex-col items-start justify-start gap-2',
        className,
      )}
    >
      <Typography variant='h3' font='roboto' className='line-clamp-2'>
        {name}
      </Typography>
      <Typography variant='body' font='roboto' className='line-clamp-3'>
        {description}
      </Typography>
      <div className='flex flex-wrap gap-2'>
        {country && <Label text={country} />}
        {presence && <Label text={presence} />}
      </div>
    </a>
  )
}
