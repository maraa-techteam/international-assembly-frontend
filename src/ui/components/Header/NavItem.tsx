'use client'

import { cn } from '@/lib/utils/cn'
import { TransformedSecondTierNavigationType } from '@/types/navigation'
import {
  DesktopSubMenu,
  Icon,
  MobileSubMenu,
  Typography,
} from '@/ui/components'
import Link from 'next/link'
import { useState } from 'react'

type NavItemProps = {
  name: string
  href: string
  toggleSelect: () => void
  isActive: boolean
  subNav: {
    name: string
    href: string
    description: string
    isFrequentlyVisited: boolean
  }[]
}

export function NavItem({
  name,
  href,
  subNav,
  toggleSelect,
  isActive,
}: NavItemProps) {
  const transformedSubNav: TransformedSecondTierNavigationType = subNav.map(
    (item, i) => ({
      ...item,
      isActive: i === 0 ? true : false,
    }),
  )

  const [activeItems, setActiveItems] =
    useState<TransformedSecondTierNavigationType>(transformedSubNav)

  const handleMouseEnter = (index: number) => {
    setActiveItems((prev) => {
      return prev.map((item, i) => {
        return {
          ...item,
          isActive: i === index,
        }
      })
    })
  }

  // Simple navigation item without submenu
  if (subNav.length === 0) {
    return (
      <li className='w-full list-none lg:w-fit'>
        <Link
          href={href}
          className='text-foreground hover:bg-primary lg:hover:text-foreground block w-full px-4 py-3 font-mono font-bold hover:text-white lg:p-0 lg:font-normal lg:hover:bg-transparent'
        >
          {name}
        </Link>
      </li>
    )
  }

  // Navigation item with submenu
  return (
    <li className='static flex flex-row items-center justify-center lg:relative'>
      <button
        onClick={() => toggleSelect()}
        className='hover:bg-primary group flex w-full cursor-pointer flex-row items-center justify-between px-4 py-3 whitespace-nowrap lg:w-fit lg:justify-center lg:gap-1 lg:p-0 lg:hover:bg-transparent'
      >
        <Typography
          variant='body'
          className='lg:group-hover:text-foreground font-medium group-hover:text-white lg:font-normal'
          font='mono'
        >
          {name}
        </Typography>
        <Icon
          icon={'chevron-down'}
          size={'md'}
          className={cn(
            isActive ? 'scale-[-1]' : '',
            'text-foreground hidden lg:flex',
          )}
        />
        <Icon
          icon={'chevron-right'}
          size={'md'}
          className={'text-foreground flex group-hover:text-white lg:hidden'}
        />
      </button>

      <MobileSubMenu
        isActive={isActive}
        activeItems={activeItems}
        toggleSelect={toggleSelect}
      />

      {isActive && (
        <DesktopSubMenu
          activeItems={activeItems}
          subNav={subNav}
          onMouseEnter={handleMouseEnter}
        />
      )}
    </li>
  )
}
