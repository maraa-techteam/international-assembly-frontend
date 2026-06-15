'use client'

import { Typography } from '@/common/components/Typography/Typography'
import { cn } from '@/common/utils/cn'
import Link from 'next/link'
import { useState } from 'react'

type DesktopSubMenuPropsType = {
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
}: DesktopSubMenuPropsType) {
  const [index, setIndex] = useState(0)
  const activeItem = navigationData[index]

  return (
    <div className='absolute top-15 right-1/2 hidden min-h-65 w-dvw max-w-3xl translate-x-1/2 grid-cols-2 gap-8 bg-white p-8 shadow lg:grid'>
      <ul className='hidden flex-col lg:flex'>
        {navigationData.map((item, i) => (
          <li key={item.name}>
            <Link
              onClick={onSelect}
              href={item.href}
              className={cn(
                'hover:bg-indigo-blue flex flex-col rounded-full px-3 py-4 whitespace-nowrap last:mb-0 hover:text-white',
                item === activeItem
                  ? 'bg-indigo-blue text-white'
                  : 'text-inherit',
              )}
              onMouseEnter={() => setIndex(i)}
            >
              <Typography variant='body' className='font-normal text-inherit'>
                {item.name}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
      <div className='hidden flex-col p-4 lg:flex'>
        {navigationData.map((item, i) => {
          return (
            <Typography variant='body' className='text-sm' key={item.name}>
              {item === activeItem ? item.description : ''}
            </Typography>
          )
        })}
      </div>
    </div>
  )
}
