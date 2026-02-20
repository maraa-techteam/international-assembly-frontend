'use client'

import { Icon } from '@/common/components'
import { cn } from '@/common/utils/cn'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { SearchBarType } from './SearchBar.type'

type SearchBarProps = SearchBarType & { className?: string }

export function SearchBar({
  onToggle = () => {},
  isExpanded,
  className,
  placeholder = 'Поиск на сайте',
  isReseted = false,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleToggle = () => {
    onToggle(!isExpanded)
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setSearchValue('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchValue.trim()
    if (!q) return

    router.push(`/search?search=${encodeURIComponent(q)}`)
  }

  useEffect(() => {
    setSearchValue('')
  }, [isReseted])

  return (
    <div
      className={cn('relative flex w-full items-center justify-end', className)}
    >
      <div
        className={cn(
          'relative transition-all duration-200 ease-out',
          isExpanded && 'w-full',
        )}
      >
        {!isExpanded && (
          <button
            aria-label='Открыть строку поиска'
            onClick={handleToggle}
            className='flex cursor-pointer items-center justify-center'
          >
            <Icon icon='search' size='md' />
          </button>
        )}

        {isExpanded && (
          <form onSubmit={handleSubmit} className='relative'>
            <Icon
              icon='search'
              className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-600'
            />

            <input
              id='search-input'
              ref={inputRef}
              type='text'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={placeholder}
              className='font-roboto border-border focus:border-primary focus:ring-primary/20 z-0 h-12 w-full rounded-full border-none bg-gray-100 pr-4 pl-12 text-base transition-all duration-300 ease-in-out outline-none focus:ring-2'
            />

            <button
              type='button'
              onClick={handleToggle}
              aria-label='Закрыть строку поиска'
              className={cn(
                'absolute top-1/2 right-3 hidden h-6 w-6 -translate-y-1/2 transform items-center justify-center text-gray-600 transition-colors duration-200 lg:flex',
              )}
            >
              <Icon icon='close' className='text-foreground' size='md' />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
