'use client'

import { cn } from '@/lib/utils/cn'
import { NavigationDataType } from '@/types/Header'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

import Icon from '../Icon/Icon'
import NavItem from '../NavItem/NavItem'
import SearchBar from '../SearchBar/SearchBar'

type TransformedNavigationDataType = NavigationDataType & {
  isActive: boolean
}

type HeaderProps = { headerData: NavigationDataType[] }

const Header: FC<HeaderProps> = ({ headerData }) => {
  const transformedNavigationData = headerData.map((item) => {
    return {
      ...item,
      isActive: false,
    }
  })

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false)
  const [isMobileMenuActive, setIsMobileMenuActive] = useState<boolean>(false)
  const [navigation, setNavigation] = useState<TransformedNavigationDataType[]>(
    transformedNavigationData,
  )

  const toggleSelect = (index: number) => {
    setNavigation((prevItems) => {
      return prevItems.map((item, i) => {
        return { ...item, isActive: i === index ? !item.isActive : false }
      })
    })
  }

  const resetSelect = () => {
    setNavigation((prevItems) => {
      return prevItems.map((item) => {
        return { ...item, isActive: false }
      })
    })
  }

  return (
    <header
      className={cn(
        'relative flex w-full flex-row items-center justify-between gap-3 bg-white p-4 lg:gap-8 lg:px-18',
        isSearchActive && 'flex-col items-stretch lg:flex-row',
      )}
    >
      <ul
        className={cn(
          'absolute top-[80px] right-0 flex h-dvh w-full flex-col bg-white transition-transform duration-300 lg:hidden',
          isMobileMenuActive ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {navigation.map((item, i) => {
          return (
            <NavItem
              key={`${i}-${item.isActive}`}
              href={item.href}
              name={item.name}
              isActive={item.isActive}
              toggleSelect={() => toggleSelect(i)}
              subNav={item.subNav}
            />
          )
        })}
      </ul>
      <div className='flex flex-row items-center justify-between'>
        <Link className='flex content-center items-center' href={'/'}>
          <div className='flex w-fit flex-row content-center items-center gap-2'>
            <Image
              src={'/logo.svg'}
              width={194}
              height={50}
              className='shrink-0'
              alt={'logo'}
            />
          </div>
        </Link>
        <button
          onClick={() => {
            setIsMobileMenuActive((prev) => !prev)
          }}
          className={cn('hidden', isSearchActive && 'block lg:hidden')}
        >
          <Icon icon={'close'} className='text-foreground' size={'md'} />
        </button>
      </div>

      {!isSearchActive && (
        <ul className='hidden h-fit flex-row items-center justify-start gap-x-8 gap-y-2 bg-white lg:flex'>
          {navigation.map((item, i) => {
            return (
              <NavItem
                key={`${i}-${item.isActive}`}
                href={item.href}
                name={item.name}
                isActive={item.isActive}
                toggleSelect={() => toggleSelect(i)}
                subNav={item.subNav}
              />
            )
          })}
        </ul>
      )}
      <div className='flex flex-row items-center justify-center gap-2'>
        <SearchBar
          className={cn(isMobileMenuActive && 'hidden')}
          onToggle={setIsSearchActive}
        />
        {isMobileMenuActive ? (
          <button
            onClick={() => {
              resetSelect()
              setIsMobileMenuActive((prev) => !prev)
            }}
            className={cn('block lg:hidden')}
          >
            <Icon icon={'close'} className='text-foreground' size={'md'} />
          </button>
        ) : (
          <button
            onClick={() => setIsMobileMenuActive((prev) => !prev)}
            className={cn('block lg:hidden', isSearchActive && 'hidden')}
          >
            <Icon icon={'hamburger'} className='text-foreground' size={'md'} />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
