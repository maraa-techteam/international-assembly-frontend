'use client'

import { cn } from '@/lib/utils/cn'
import { TransformedSecondTierNavigationType } from '@/types/navigation'
import { Typography } from '@/ui/components'
import Link from 'next/link'
import { useState } from 'react'

type DesktopSubMenuProps = {
  onSelect: () => void
  navigationData: {
    name: string
    href: string
    description: string
    isFrequentlyVisited: boolean
  }[]
}

export function DesktopSubMenu({
  navigationData,
  onSelect,
}: DesktopSubMenuProps) {
  const transformedSubNav: TransformedSecondTierNavigationType =
    navigationData.map((item, i) => ({
      ...item,
      isActive: i === 0 ? true : false,
    }))

  const [activeItems, setActiveItems] =
    useState<TransformedSecondTierNavigationType>(transformedSubNav)

  const selectItem = (index: number) => {
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
    <div className='absolute top-15 right-1/2 hidden w-dvw max-w-3xl translate-x-1/2 grid-cols-2 gap-8 bg-white p-8 shadow lg:grid'>
      <ul className='hidden flex-col lg:flex'>
        {activeItems.map((item, i) => (
          <li key={item.name}>
            <Link
              onClick={onSelect}
              href={item.href}
              className={cn(
                'hover:bg-primary flex flex-col rounded-full px-3 py-4 whitespace-nowrap last:mb-0 hover:text-white',
                item.isActive ? 'bg-primary text-white' : 'text-inherit',
              )}
              onMouseEnter={() => selectItem(i)}
            >
              <Typography
                variant='body'
                font='roboto'
                className='font-normal text-inherit'
              >
                {item.name}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
      <div aria-hidden className='hidden flex-col p-4 lg:flex'>
        {navigationData.map((item, i) => {
          return (
            <Typography
              variant='body'
              font='roboto'
              className='text-sm'
              key={item.name}
            >
              {activeItems[i].isActive && item.description}
            </Typography>
          )
        })}
      </div>
    </div>
  )
}
