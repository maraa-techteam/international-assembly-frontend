import { Typography } from '@/common/components/Typography/Typography'
import { cn } from '@/common/utils/cn'
import { ServiceLabels } from '@/features/services/components/ServiceLabels/ServiceLabels'
import Link from 'next/link'

import { SearchServiceResultCardType } from './SearchServiceResultCard.type'

type SearchServiceResultCardProps = SearchServiceResultCardType

export function SearchServiceResultCard({
  name,
  description,
  slug,
  category,
  engagement,
  required_sobriety_time,
  className,
}: SearchServiceResultCardProps) {
  return (
    <div
      className={cn('flex flex-col items-start justify-start gap-4', className)}
    >
      <Link href={`/services/${slug}`}>
        <Typography variant='h3' className='text-primary line-clamp-2'>
          {name}
        </Typography>
      </Link>
      {description && (
        <Typography variant='body' className='line-clamp-3'>
          {description}
        </Typography>
      )}
      <ServiceLabels
        service={{ category, engagement, required_sobriety_time }}
      />
    </div>
  )
}
