'use client'

import { Icon, SearchBar } from '@/common/components'
import { useEscapeClose } from '@/common/hooks/useEscapeClose'
import { useOnClickOutside } from '@/common/hooks/useOutsideClick'
import { TransformedNavigationType } from '@/common/types/Navigation'
import { cn } from '@/common/utils/cn'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { DesktopSubMenu } from './components/DesktopSubMenu'
import { MobileSubMenu } from './components/MobileSubMenu'
import { NavItem } from './components/NavItem'

type HeaderProps = { headerData: TransformedNavigationType[] }

export function Header({ headerData }: HeaderProps) {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false)
  const [isMobileMenuActive, setIsMobileMenuActive] = useState<boolean>(false)
  const [navigation, setNavigation] =
    useState<TransformedNavigationType[]>(headerData)

  const [hidden, setHidden] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(headerRef, () => {
    setIsSearchActive(false)
    resetSelect()
  })

  const toggleSelect = (index: number) => {
    setNavigation((prevItems) => {
      return prevItems.map((item, i) => {
        return { ...item, isActive: i === index ? !item.isActive : false }
      })
    })
  }

  const toggleSearch = (active: boolean) => {
    setIsSearchActive(active)
  }

  const resetSelect = () => {
    setNavigation((prev) => {
      if (!prev.some((item) => item.isActive)) return prev
      return prev.map((item) =>
        item.isActive ? { ...item, isActive: false } : item,
      )
    })
  }

  useEscapeClose(() => {
    setIsSearchActive(false)
    resetSelect()
  })

  useEffect(() => {
    let lastScroll = 0
    let ticking = false

    const handleScroll = () => {
      if (ticking) return

      ticking = true

      requestAnimationFrame(() => {
        const currentScroll = window.scrollY

        if (currentScroll <= 0) {
          setHidden(false)
          ticking = false
          return
        }

        if (currentScroll > lastScroll) {
          if (!isSearchActive && !isMobileMenuActive) {
            setHidden(true)
            resetSelect()
          }
        } else {
          setHidden(false)
        }

        lastScroll = currentScroll
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuActive, isSearchActive])

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 z-50 flex w-full translate-y-0 flex-row items-center justify-between gap-3 bg-white p-4 transition-transform duration-300 lg:gap-8 lg:px-18',
        isSearchActive && 'flex-col items-stretch lg:flex-row',
        hidden && !isMobileMenuActive && '-translate-y-full',
      )}
    >
      <div className='flex flex-row items-center justify-between'>
        <Link className='flex content-center items-center' href={'/'}>
          <Image
            src={'/logo_colorized.svg'}
            width={230}
            height={54}
            className='shrink-0'
            alt='Логотип АА'
          />
        </Link>

        {(!isMobileMenuActive || !isSearchActive) && (
          <button
            onClick={() =>
              !isMobileMenuActive
                ? setIsSearchActive(false)
                : setIsMobileMenuActive((prev) => !prev)
            }
            className={cn('hidden', isSearchActive && 'block lg:hidden')}
          >
            <Icon
              icon='close'
              className='text-contrast'
              size='md'
              color='foreground'
            />
          </button>
        )}
      </div>

      {/* Mobile menu */}
      <ul
        className={cn(
          'absolute top-20 right-0 flex h-dvh w-full flex-col bg-white transition-transform duration-300 lg:hidden',
          isMobileMenuActive ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {navigation.map((item, i) => {
          return (
            <li className='relative' key={item.name}>
              <NavItem
                href={item.href}
                name={item.name}
                isActive={item.isActive}
                toggleSelect={() => toggleSelect(i)}
                subNav={item.subNav}
              />
              {item.subNav.length > 0 && (
                <MobileSubMenu
                  onClick={() => {
                    setIsMobileMenuActive(false)
                  }}
                  isActive={item.isActive}
                  activeItems={item.subNav.map((subItem, j) => ({
                    ...subItem,
                    isActive: j === 0 ? true : false,
                  }))}
                  toggleSelect={() => toggleSelect(i)}
                />
              )}
            </li>
          )
        })}
      </ul>

      {/* Desktop menu */}
      {!isSearchActive && (
        <ul className='hidden h-fit flex-row items-center justify-start gap-x-8 gap-y-2 bg-white lg:flex'>
          {navigation.map((item, i) => {
            return (
              <li className='relative' key={item.name}>
                <NavItem
                  href={item.href}
                  name={item.name}
                  isActive={item.isActive}
                  toggleSelect={() => toggleSelect(i)}
                  subNav={item.subNav}
                />
                {item.isActive && item.subNav.length > 0 && (
                  <DesktopSubMenu
                    onSelect={resetSelect}
                    navigationData={item.subNav}
                  />
                )}
              </li>
            )
          })}
        </ul>
      )}
      <div
        className={cn(
          'flex flex-row items-center justify-end gap-2',
          isSearchActive ? 'w-full' : 'w-fit',
        )}
      >
        <SearchBar
          className={cn(
            isMobileMenuActive && 'hidden',
            'lg:max-w-125 lg:rounded-xl',
          )}
          isExpanded={isSearchActive}
          onToggle={toggleSearch}
        />

        {/* Hamburger menu toggle */}
        {isMobileMenuActive ? (
          <button
            onClick={() => {
              resetSelect()
              setIsMobileMenuActive((prev) => !prev)
            }}
            className={cn('block lg:hidden')}
          >
            <Icon
              icon={'close'}
              className='text-contrast'
              size={'md'}
              color='foreground'
            />
          </button>
        ) : (
          <button
            onClick={() => setIsMobileMenuActive((prev) => !prev)}
            className={cn('block lg:hidden', isSearchActive && 'hidden')}
          >
            <Icon
              icon={'hamburger'}
              className='text-contrast'
              size={'md'}
              color='foreground'
            />
          </button>
        )}
      </div>
    </header>
  )
}
