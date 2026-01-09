'use client'

import {
  SecondTierNavigationType,
  TransformedSecondTierNavigationType,
} from '@/types/navigation'
import { Button, LinkComponent, Typography } from '@/ui/components'
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
    <div className='flex h-full w-full flex-col gap-4 lg:gap-6'>
      <div className='flex w-[calc(100%+32px)] flex-row gap-4 overflow-x-auto lg:w-full'>
        {activeItems.map((button, i) => {
          return (
            <Button
              key={i}
              color={'white'}
              variant={button.isActive ? 'contained' : 'outlined'}
              size={'sm'}
              as={'button'}
              onClick={() => handleClick(i)}
              type='button'
              label={button.name}
            />
          )
        })}
      </div>

      <div className='flex flex-col gap-4 lg:gap-6'>
        {activeItems.map(
          (item, i) =>
            activeItems[i].isActive && (
              <div className='flex flex-col justify-between gap-4' key={i}>
                <Typography variant='body' font={'roboto'}>
                  {item.description}
                </Typography>
                <LinkComponent
                  icon={'arrow-right'}
                  text={'Подробнее'}
                  href={'/'}
                  variant={'icon-right'}
                  color={'contrast'}
                  className='self-end'
                />
              </div>
            ),
        )}
      </div>
    </div>
  )
}
