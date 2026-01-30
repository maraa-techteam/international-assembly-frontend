'use client'

import { useOnClickOutside } from '@/lib/hooks/useOutsideClick'
import { cn } from '@/lib/utils/cn'
import { TransformedNavigationType } from '@/types/navigation'
import {
  DesktopSubMenu,
  Icon,
  MobileSubMenu,
  NavItem,
  SearchBar,
} from '@/ui/components'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

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
    const scrollY = window.scrollY
    setIsSearchActive(active)
    // Restore scroll position after layout change
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY)
    })
  }

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
        setIsSearchActive(false)
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
        if (!isSearchActive && !isMobileMenuActive) {
          setHidden(true)
          resetSelect()
        }
      } else {
        setHidden(false)
      }

      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
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
        <Link
          className='flex content-center items-center'
          href={'/'}
          aria-label='Перейти на главную страницу'
        >
          <div className='flex w-fit flex-row content-center items-center gap-2'>
            <Image
              src={'/logo_colorized.svg'}
              width={230}
              height={54}
              className='shrink-0'
              alt='Логотип АА'
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
            aria-label={
              isMobileMenuActive ? 'Закрыть мобильное меню' : 'Закрыть поиск'
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

      <nav aria-label='Основная навигация'>
        {/* Mobile menu */}
        <ul
          className={cn(
            'absolute top-[80px] right-0 flex h-dvh w-full flex-col bg-white transition-transform duration-300 lg:hidden',
            isMobileMenuActive ? 'translate-x-0' : 'translate-x-full',
          )}
          aria-hidden={!isMobileMenuActive}
        >
          {navigation.map((item, i) => {
            return (
              <li className='relative' key={i}>
                <NavItem
                  key={i}
                  href={item.href}
                  name={item.name}
                  isActive={item.isActive}
                  toggleSelect={() => toggleSelect(i)}
                  subNav={item.subNav}
                  aria-expanded={item.isActive}
                  aria-controls={
                    item.subNav.length > 0 ? `submenu-mobile-${i}` : undefined
                  }
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
                    aria-label={`Подменю ${item.name}`}
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
                <li className='relative' key={i}>
                  <NavItem
                    key={`${i}-${item.isActive}`}
                    href={item.href}
                    name={item.name}
                    isActive={item.isActive}
                    toggleSelect={() => toggleSelect(i)}
                    subNav={item.subNav}
                    aria-expanded={item.isActive}
                    aria-controls={
                      item.subNav.length > 0
                        ? `submenu-desktop-${i}`
                        : undefined
                    }
                    aria-haspopup={item.subNav.length > 0 ? 'menu' : undefined}
                  />
                  {item.isActive && item.subNav.length > 0 && (
                    <DesktopSubMenu
                      onSelect={resetSelect}
                      key={i}
                      navigationData={item.subNav}
                      aria-label={`Подменю ${item.name}`}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </nav>

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
          aria-label='Поиск по сайту'
        />

        {/* Hamburger menu toggle */}
        {isMobileMenuActive ? (
          <button
            onClick={() => {
              resetSelect()
              setIsMobileMenuActive((prev) => !prev)
            }}
            aria-label='Закрыть мобильное меню'
            aria-expanded={isMobileMenuActive}
            aria-controls='mobile-menu'
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
            aria-label='Открыть мобильное меню'
            aria-expanded={isMobileMenuActive}
            aria-controls='mobile-menu'
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
