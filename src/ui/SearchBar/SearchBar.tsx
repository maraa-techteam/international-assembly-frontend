import { cn } from '@/lib/utils/cn'
import React, { useRef, useState } from 'react'

import Icon from '../Icon/Icon'

type SearchBarProps = {
  onSearch?: (value: string) => void
  onToggle: (isActive: boolean) => void
  className?: string
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onToggle,
  className,
  placeholder = 'Поиск на сайте',
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const handleToggle = () => {
    onToggle(!isExpanded)
    setIsExpanded(!isExpanded)
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

  return (
    <>
      <div
        className={cn(
          'relative flex w-full items-center justify-end',
          isExpanded ? 'w-full lg:max-w-96' : 'max-w-fit',
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
              onClick={handleToggle}
              className={
                'flex h-12 w-12 cursor-pointer items-center justify-center'
              }
            >
              <Icon icon={'search'} size={'md'} />
            </button>
          )}

          {/* TODO: Add input text color from figma - think about color system */}
          {isExpanded && (
            <form onSubmit={handleSubmit} className='relative'>
              <input
                ref={inputRef}
                onBlur={handleToggle}
                type='text'
                value={searchValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className='z-0 h-12 w-full rounded-full border-none bg-gray-100 px-4 font-mono text-base transition-all duration-700 ease-in-out outline-none lg:rounded-none'
              />

              <button
                type='button'
                onClick={handleToggle}
                className={cn(
                  'absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center text-gray-600 transition-colors duration-200',
                )}
              >
                <Icon
                  icon={'close'}
                  className='text-foreground hidden lg:flex'
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

export default SearchBar
