'use client'

import { Button } from '@/common/components/Button/Button'
import type { SecondTierNavigationType } from '@/common/components/Header/data'
import { Icon } from '@/common/components/Icon/Icon'
import { Typography } from '@/common/components/Typography/Typography'
import Link from 'next/link'
import { useState } from 'react'

type ContentGuideProps = {
  data: SecondTierNavigationType[]
}

export function ContentGuide({ data }: ContentGuideProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = data[activeIndex]

  return (
    <div className='flex h-full min-h-75 w-full flex-col justify-between gap-4 lg:gap-6'>
      <div className='flex w-full snap-x snap-mandatory flex-row gap-4 overflow-x-auto'>
        {data.map((button, i) => (
          <Button
            key={button.name}
            color='white'
            variant={i === activeIndex ? 'contained' : 'outlined'}
            size='sm'
            as='button'
            onClick={() => setActiveIndex(i)}
            type='button'
            label={button.name}
            className='shrink-0 snap-start'
          />
        ))}
      </div>

      <div className='flex flex-1 flex-col justify-between gap-4'>
        <Typography className='max-w-200' variant='body'>
          {activeItem.description}
        </Typography>
        <Link
          href={activeItem.href}
          className='text-contrast flex flex-row items-center gap-4 self-end'
        >
          Подробнее
          <Icon icon='arrow-right' />
        </Link>
      </div>
    </div>
  )
}
