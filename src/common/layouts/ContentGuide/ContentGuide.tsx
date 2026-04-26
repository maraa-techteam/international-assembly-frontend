'use client'

import { Button, LinkComponent, Typography } from '@/common/components'
import {
  SecondTierNavigationType,
  TransformedSecondTierNavigationType,
} from '@/common/types/SecondTierNavigation'
import { useState } from 'react'

type ContentGuideProps = {
  data: SecondTierNavigationType[]
}

export function ContentGuide({ data }: ContentGuideProps) {
  const transformedSubNav: TransformedSecondTierNavigationType = data.map(
    (item, i) => ({
      ...item,
      isActive: i === 0 ? true : false,
    }),
  )

  const [activeItems, setActiveItems] =
    useState<TransformedSecondTierNavigationType>(transformedSubNav)

  const handleClick = (index: number) => {
    setActiveItems((prev) => {
      return prev.map((item, i) => {
        return {
          ...item,
          isActive: i === index,
        }
      })
    })
  }
  return (
    <div className='flex h-full min-h-75 w-full flex-col justify-between gap-4 lg:gap-6'>
      <div className='flex w-full snap-x snap-mandatory flex-row gap-4 overflow-x-auto'>
        {activeItems.map((button, i) => {
          return (
            <Button
              key={button.name}
              color='white'
              variant={button.isActive ? 'contained' : 'outlined'}
              size='sm'
              as='button'
              onClick={() => handleClick(i)}
              type='button'
              label={button.name}
              className='shrink-0 snap-start'
            />
          )
        })}
      </div>

      {activeItems.map(
        (item, i) =>
          activeItems[i].isActive && (
            <div
              className='flex flex-1 flex-col justify-between gap-4'
              key={item.name}
            >
              <Typography className='max-w-200' variant='body' font='roboto'>
                {item.description}
              </Typography>
              <LinkComponent
                icon='arrow-right'
                text='Подробнее'
                href={item.href}
                variant='icon-right'
                color='contrast'
                className='self-end'
              />
            </div>
          ),
      )}
    </div>
  )
}
