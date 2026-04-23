'use client'

import { Icon, Typography } from '@/common/components'
import { useOnClickOutside } from '@/common/hooks/useOutsideClick'
import { cn } from '@/common/utils/cn'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { SelectType } from './Select.type'

const SEARCH_THRESHOLD = 10

type SelectProps = SelectType & {
  className?: string
}

export function Select({
  label,
  options,
  value,
  onChange,
  className,
  textColor,
}: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [hasMoreBelow, setHasMoreBelow] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(selectRef, () => {
    setIsDropdownOpen(false)
    setSearchQuery('')
  })

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setSearchQuery('')
    }
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSelect = (optionLabel: string) => {
    if (value.includes(optionLabel)) {
      onChange(value.filter((item) => item !== optionLabel))
    } else {
      onChange([...value, optionLabel])
    }
  }

  const getName = (label: string) =>
    label === 'Страна'
      ? 'country'
      : label === 'Формат'
        ? 'presence'
        : 'schedule_slots'

  const selectedCount = value.length

  const id = useId()
  const checkboxId = `${id}-checkbox`

  const showSearch = options.length > SEARCH_THRESHOLD
  const filteredOptions =
    showSearch && searchQuery
      ? options.filter((option) =>
          option.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : options

  return (
    <div
      ref={selectRef}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
          setIsDropdownOpen(false)
          setSearchQuery('')
        }
      }}
      className={cn('relative flex w-full', className)}
    >
      <button
        id={`dropdown-trigger-${id}`}
        aria-expanded={isDropdownOpen}
        aria-controls={`dropdown-menu-${id}`}
        tabIndex={0}
        type='button'
        className={cn(
          'inline-flex w-full items-center overflow-hidden rounded-3xl bg-white font-medium',
          isDropdownOpen && 'rounded-b-none',
        )}
        onClick={toggleDropdown}
      >
        <Typography
          className={cn(
            'font-roboto w-full cursor-pointer appearance-none bg-white px-4 py-3 pr-12 text-left whitespace-nowrap transition-colors',
            textColor,
          )}
          variant='caption'
        >
          {label}
        </Typography>

        {selectedCount > 0 && (
          <div className='bg-primary absolute right-11 flex max-h-5 items-center rounded-md p-1 text-[10px] text-white'>
            +{selectedCount}
          </div>
        )}

        <Icon
          icon='chevron-down'
          className={cn(
            'pointer-events-none absolute right-4',
            textColor,
            isDropdownOpen && 'rotate-180',
          )}
          size='md'
        />
      </button>

      <div
        id={`dropdown-menu-${id}`}
        hidden={!isDropdownOpen}
        className='absolute top-full z-10 w-full overflow-hidden rounded-b-3xl bg-white shadow-md'
      >
        <div className='relative max-h-60 overflow-y-auto rounded-b-3xl'>
          <div className='flex w-full flex-col'>
            {showSearch && (
              <div className='sticky top-0 bg-white px-4 py-2'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Поиск...'
                  className='border-primary/40 focus:border-primary w-full rounded-lg border px-3 py-1.5 text-base outline-none'
                  aria-label='Поиск опций'
                />
              </div>
            )}
            {filteredOptions.map((option, i) => {
              const isSelected = value.includes(option)

              return (
                <div key={option}>
                  <input
                    tabIndex={0}
                    name={getName(label)}
                    id={`${checkboxId}-${option}`}
                    type='checkbox'
                    checked={isSelected}
                    value={option}
                    onChange={() => handleSelect(option)}
                    className='peer sr-only'
                    aria-label={option}
                  />
                  <label
                    htmlFor={`${checkboxId}-${option}`}
                    role='option'
                    aria-selected={isSelected}
                    className={cn(
                      'hover:bg-light-blue peer-focus-visible:bg-light-blue flex cursor-pointer items-center px-4 py-2 peer-focus-visible:outline-2',
                      i === filteredOptions.length - 1 && 'rounded-b-3xl',
                    )}
                  >
                    <span
                      role='checkbox'
                      aria-checked={isSelected}
                      className={cn(
                        'mr-3 flex h-4 w-4 items-center justify-center rounded-sm border transition-colors',
                        isSelected
                          ? 'bg-primary border-primary text-white'
                          : 'border-gray-300 bg-white',
                      )}
                      aria-hidden='true'
                    >
                      {isSelected && (
                        <Icon
                          icon='check'
                          size='sm'
                          className='pointer-events-none'
                        />
                      )}
                    </span>
                    <span className='truncate'>{option}</span>
                  </label>
                </div>
              )
            })}
          </div>

          {hasMoreBelow && (
            <div
              data-testid='scroll-gradient'
              aria-hidden='true'
              className='pointer-events-none absolute right-0 bottom-0 left-0 h-12 rounded-b-3xl bg-gradient-to-t from-white to-transparent'
            />
          )}
        </div>
      </div>
    </div>
  )
}
