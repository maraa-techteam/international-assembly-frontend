'use client'

import { cn } from '@/lib/utils/cn'
import { SearchBarProps } from '@/types/components'
import { Icon } from '@/ui/components'
import React, { useEffect, useRef, useState } from 'react'

export function SearchBar({
  onSearch,
  onToggle = () => {},
  isExpanded,
  className,
  placeholder = 'Поиск на сайте',
  isReseted = false,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const handleToggle = () => {
    onToggle(!isExpanded)
    if (!isExpanded) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    } else {
      setSearchValue('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    if (onSearch) {
      onSearch(value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim() && onSearch) {
      onSearch(searchValue.trim())
    }
  }

  useEffect(() => {
    setSearchValue('')
  }, [isReseted])

  return (
    <>
      <div
        className={cn(
          'relative flex w-full items-center justify-end',
          className,
        )}
      >
        <div
          className={cn(
            'relative transition-all duration-200 ease-out',
            isExpanded ? 'w-full' : 'w-12',
          )}
        >
          {!isExpanded && (
            <button
              aria-label={'Открыть строку поиска'}
              onClick={handleToggle}
              className={
                'flex h-12 w-12 cursor-pointer items-center justify-center'
              }
            >
              <Icon color='foreground' icon={'search'} size={'md'} />
            </button>
          )}

          {isExpanded && (
            <form onSubmit={handleSubmit} className='relative'>
              <Icon
                icon='search'
                className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-600'
              />
              <input
                ref={inputRef}
                type='text'
                value={searchValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className='font-roboto z-0 h-12 w-full rounded-full border-none bg-gray-100 pr-4 pl-12 text-base transition-all duration-700 ease-in-out outline-none'
              />

              <button
                type='button'
                onClick={handleToggle}
                aria-label={'Закрыть строку поиска'}
                className={cn(
                  'absolute top-1/2 right-3 hidden h-6 w-6 -translate-y-1/2 transform items-center justify-center text-gray-600 transition-colors duration-200 lg:flex',
                )}
              >
                <Icon
                  color='foreground'
                  icon={'close'}
                  className='text-foreground'
                  size={'md'}
                />
              </button>
            </form>
          )}
        </div>
      </div>
      {/* {searchValue ? <div className='px-2 py-2'>{searchValue}</div> : ''} */}
    </>
  )
}
