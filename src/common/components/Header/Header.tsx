'use client'

import { DesktopSubMenu } from '@/common/components/Header/components/DesktopSubMenu'
import { MobileSubMenu } from '@/common/components/Header/components/MobileSubMenu'
import { NavItem } from '@/common/components/Header/components/NavItem'
import { headerNavigationData } from '@/common/components/Header/data'
import { Icon } from '@/common/components/Icon/Icon'
import { useEscapeClose } from '@/common/hooks/useEscapeClose'
import { useIsMobile } from '@/common/hooks/useMobile'
import { useOnClickOutside } from '@/common/hooks/useOutsideClick'
import { cn } from '@/common/utils/cn'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type HeaderProps = { headerData: typeof headerNavigationData }

export function Header({ headerData }: HeaderProps) {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState<boolean>(false)
  const [navigation, setNavigation] =
    useState<typeof headerNavigationData>(headerData)

  const [hidden, setHidden] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const headerRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(headerRef, () => {
    resetSelect()
  })

  useEscapeClose(() => {
    if (navigation.some((item) => item.isActive)) {
      resetSelect()
      return
    }
    setIsMobileMenuActive(false)
    resetSelect()
  })

  const toggleSelect = (index: number) => {
    setNavigation((prevItems) => {
      return prevItems.map((item, i) => {
        return { ...item, isActive: i === index ? !item.isActive : false }
      })
    })
  }

  const resetSelect = () => {
    setNavigation((prev) => {
      if (!prev.some((item) => item.isActive)) return prev
      return prev.map((item) =>
        item.isActive ? { ...item, isActive: false } : item,
      )
    })
  }

  // Close the mobile menu on route change (e.g. browser back/forward)
  useEffect(() => {
    setIsMobileMenuActive(false)
    resetSelect()
  }, [pathname])

  // Navigate immediately and let the pathname-change effect close the menu
  // once the destination page has rendered.
  const handleMobileNavClose = (href: string) => {
    resetSelect()
    router.push(href)
  }

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
          if (!isMobileMenuActive) {
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
  }, [isMobileMenuActive])

  const isMobile = useIsMobile()

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 z-50 flex w-full translate-y-0 flex-row items-center justify-between gap-4 bg-white p-4 transition-transform duration-300 lg:gap-8 lg:px-18',
        hidden && !isMobileMenuActive && '-translate-y-full',
      )}
    >
      <div className='flex flex-row items-center justify-between'>
        <Link className='flex content-center items-center' href='/'>
          <Image
            src='/images/logo_colorized.svg'
            width={230}
            height={54}
            className='min-w-57.5 shrink-0'
            alt='Логотип АА'
          />
        </Link>
      </div>
      {isMobile && (
        <div className='flex w-fit flex-row items-center justify-end gap-2'>
          {/* Hamburger menu toggle */}
          {isMobileMenuActive ? (
            <button
              aria-expanded={isMobileMenuActive}
              aria-controls='mobile-menu'
              aria-haspopup
              aria-label='Закрыть мобильное меню'
              onClick={() => {
                resetSelect()
                setIsMobileMenuActive((prev) => !prev)
              }}
              className={cn('block lg:hidden')}
            >
              <Icon icon='close' className='text-contrast' size='md' />
            </button>
          ) : (
            <button
              aria-expanded={isMobileMenuActive}
              aria-controls='mobile-menu'
              aria-haspopup
              aria-label='Открыть мобильное меню'
              onClick={() => setIsMobileMenuActive((prev) => !prev)}
              className={cn('block lg:hidden')}
            >
              <Icon icon='hamburger' className='text-contrast' size='md' />
            </button>
          )}
        </div>
      )}

      {/* Mobile menu */}
      <nav
        id='mobile-menu'
        aria-label='Мобильное меню'
        aria-hidden={!isMobileMenuActive}
        className={cn(
          'absolute top-20 right-0 flex h-dvh w-full flex-col bg-white transition-transform duration-300 lg:hidden',
          isMobileMenuActive ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <ul>
          {navigation.map((item, i) => {
            return (
              <li className='relative' key={item.name}>
                <NavItem
                  onNavigate={
                    !item.subNav.length ? handleMobileNavClose : undefined
                  }
                  isFocusable={isMobileMenuActive}
                  href={item.href}
                  name={item.name}
                  isActive={item.isActive}
                  toggleSelect={() => toggleSelect(i)}
                  subNav={item.subNav}
                />
                {item.subNav.length > 0 && (
                  <MobileSubMenu
                    onNavigate={handleMobileNavClose}
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
      </nav>
      {/* Desktop menu */}
      {!isMobile && (
        <div className='flex w-full items-center justify-center'>
          <nav aria-label='Основная навигация'>
            <ul className='hidden h-fit flex-row items-center justify-start gap-x-8 gap-y-2 bg-white lg:flex'>
              {navigation.map((item, i) => {
                return (
                  <li className='relative' key={item.name}>
                    <NavItem
                      isFocusable={true}
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
          </nav>
        </div>
      )}
    </header>
  )
}
