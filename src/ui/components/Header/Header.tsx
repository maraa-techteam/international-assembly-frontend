'use client'

import { cn } from '@/lib/utils/cn'
import { TransformedNavigationType } from '@/types/navigation'
import { Icon, NavItem, SearchBar } from '@/ui/components'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type HeaderProps = { headerData: TransformedNavigationType[] }

export function Header({ headerData }: HeaderProps) {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false)
  const [isMobileMenuActive, setIsMobileMenuActive] = useState<boolean>(false)
  const [navigation, setNavigation] =
    useState<TransformedNavigationType[]>(headerData)

  const [hidden, setHidden] = useState(false)

  const resetSelect = () => {
    setNavigation((prevItems) => {
      return prevItems.map((item) => {
        return { ...item, isActive: false }
      })
    })
  }

  useEffect(() => {
    const handleEsc = (event: { key: string }) => {
      if (event.key === 'Escape') {
        resetSelect()
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  useEffect(() => {
    let lastScroll = 0

    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll <= 0) {
        setHidden(false)
        return
      }

      if (currentScroll > lastScroll) {
        setHidden(true)
        resetSelect()
      } else {
        setHidden(false)
      }

      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSelect = (index: number) => {
    setNavigation((prevItems) => {
      return prevItems.map((item, i) => {
        return { ...item, isActive: i === index ? !item.isActive : false }
      })
    })
  }

  return (
    <header
      className={cn(
        'flex w-full flex-row items-center justify-between gap-3 overflow-x-clip bg-white p-4 transition-transform duration-300 lg:sticky lg:top-0 lg:z-1 lg:translate-y-0 lg:gap-8 lg:px-18',
        isSearchActive && 'flex-col items-stretch lg:flex-row',
        hidden && 'lg:-translate-y-full',
      )}
    >
      <ul
        className={cn(
          'fixed top-[80px] right-0 flex h-dvh w-full flex-col bg-white transition-transform duration-300 lg:absolute lg:hidden',
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
              src={'/logo_colorized.svg'}
              width={230}
              height={54}
              className='shrink-0'
              alt={'logo'}
            />
          </div>
        </Link>

        {(!isMobileMenuActive || !isSearchActive) && (
          <button
            onClick={() => {
              if (!isMobileMenuActive) {
                setIsSearchActive(false)
              } else {
                setIsMobileMenuActive((prev) => !prev)
              }
            }}
            className={cn('hidden', isSearchActive && 'block lg:hidden')}
          >
            <Icon icon='close' className='text-contrast' size='md' />
          </button>
        )}
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
      <div
        className={cn(
          'flex flex-row items-center justify-end gap-2',
          isSearchActive ? 'w-full' : 'w-fit',
        )}
        onClick={() => resetSelect()}
      >
        <SearchBar
          className={cn(isMobileMenuActive && 'hidden')}
          isExpanded={isSearchActive}
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
            <Icon icon={'close'} className='text-contrast' size={'md'} />
          </button>
        ) : (
          <button
            aria-label='open-mobile-menu'
            onClick={() => setIsMobileMenuActive((prev) => !prev)}
            className={cn('block lg:hidden', isSearchActive && 'hidden')}
          >
            <Icon icon={'hamburger'} className='text-contrast' size={'md'} />
          </button>
        )}
      </div>
    </header>
  )
}
