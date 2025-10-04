'use client'

import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import { FC, useState } from 'react'

import Icon from '../Icon/Icon'
import Typography from '../Typography/Typography'

type NavItemProps = {
  name: string
  href: string
  toggleSelect: () => void
  isActive: boolean

  subNav: {
    name: string
    href: string
    description: string
  }[]
}

type SubNavTransformedType = {
  name: string
  href: string
  description: string
  isActive: boolean
}[]

const NavItem: FC<NavItemProps> = ({
  name,
  href,
  subNav,
  toggleSelect,
  isActive,
}) => {
  const transformedSubNav: SubNavTransformedType = subNav.map((item, i) => ({
    ...item,
    isActive: i === 0 ? true : false,
  }))

  const [activeItems, setActiveItems] =
    useState<SubNavTransformedType>(transformedSubNav)

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

  return (
    <>
      {subNav.length > 0 ? (
        // Desktop + mobile main menu item
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
              className={
                'text-foreground flex group-hover:text-white lg:hidden'
              }
            />
          </button>

          {/* Mobile second tier menu item */}
          <div
            className={cn(
              'absolute top-0 z-10 flex h-dvh w-full transform flex-col bg-white transition-transform duration-300 lg:hidden',
              isActive ? 'translate-x-[0]' : 'translate-x-full',
            )}
          >
            <button
              onClick={() => toggleSelect()}
              className='flex w-full cursor-pointer flex-row items-center gap-4 px-4 py-3 whitespace-nowrap hover:text-white lg:hidden lg:w-fit lg:justify-center lg:gap-1 lg:p-0'
            >
              <Icon
                icon={'arrow-left'}
                size={'md'}
                className={'text-foreground flex lg:hidden'}
              />
              <Typography variant='caption' className='font-normal' font='mono'>
                Назад
              </Typography>
            </button>
            {activeItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={cn(
                  'hover:bg-primary group flex flex-row justify-between px-3 py-4 whitespace-nowrap last:mb-0',
                )}
              >
                <Typography
                  className='group-hover:text-white'
                  variant='caption'
                  font='mono'
                >
                  {item.name}
                </Typography>
                <Icon
                  icon={'chevron-right'}
                  size={'md'}
                  className={
                    'text-foreground flex group-hover:text-white lg:hidden'
                  }
                />
              </Link>
            ))}
          </div>

          {/* Desktop second tier menu item */}
          {isActive && (
            <div className='absolute top-[52px] hidden w-dvw max-w-3xl grid-cols-2 gap-8 bg-white p-8 shadow lg:grid'>
              <nav className='hidden flex-col lg:flex'>
                {activeItems.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      'hover:bg-primary flex flex-col rounded-full px-3 py-4 whitespace-nowrap last:mb-0 hover:text-white',
                      item.isActive ? 'bg-primary text-white' : 'text-inherit',
                    )}
                    onMouseEnter={() => handleMouseEnter(i)}
                  >
                    <Typography
                      variant='body'
                      font='mono'
                      className='font-normal text-inherit'
                    >
                      {item.name}
                    </Typography>
                  </Link>
                ))}
              </nav>
              <div className='hidden flex-col p-4 lg:flex'>
                {subNav.map((item, i) => {
                  return (
                    <Typography
                      variant='body'
                      font='mono'
                      className='text-sm'
                      key={i}
                    >
                      {activeItems[i].isActive && item.description}
                    </Typography>
                  )
                })}
              </div>
            </div>
          )}
        </li>
      ) : (
        <li className='w-full list-none lg:w-fit'>
          <Link
            href={href}
            className='text-foreground hover:bg-primary lg:hover:text-foreground block w-full px-4 py-3 font-mono font-bold hover:text-white lg:p-0 lg:font-normal lg:hover:bg-transparent'
          >
            {name}
          </Link>
        </li>
      )}
    </>
  )
}

export default NavItem
