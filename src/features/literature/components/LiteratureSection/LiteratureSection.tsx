import { Icon } from '@/common/components/Icon/Icon'
import { Typography } from '@/common/components/Typography/Typography'
import Link from 'next/link'

import {
  LiteratureItem,
  LiteratureItemType,
} from '../../types/LiteratureItem.type'
import { literatureCategorySlugs } from '../../utils/literature.utils'
import { LiteratureCard } from '../LiteratureCard/LiteratureCard'

const MAX_VISIBLE = 4

type LiteratureSectionProps = {
  label: string
  type: LiteratureItemType
  items: LiteratureItem[]
}

export function LiteratureSection({
  label,
  type,
  items,
}: LiteratureSectionProps) {
  const visible = items.slice(0, MAX_VISIBLE)
  const categorySlug = literatureCategorySlugs[type]

  return (
    <div className='flex flex-col gap-4'>
      <Typography variant='h2'>{label}</Typography>

      {/* Mobile: horizontal scroll with snap; Desktop: 4-column grid */}
      <div className='flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-x-visible lg:pb-0'>
        {visible.map((item) => (
          <LiteratureCard
            key={item.slug}
            className='w-[75vw] shrink-0 snap-start sm:w-[45vw] lg:w-auto'
            {...item}
          />
        ))}
      </div>

      {items.length > MAX_VISIBLE && (
        <Link
          href={`/literature/${categorySlug}`}
          className='text-primary flex items-center justify-end'
        >
          Смотреть все
          <Icon icon='arrow-right' size='md' className='ml-2' />
        </Link>
      )}
    </div>
  )
}
