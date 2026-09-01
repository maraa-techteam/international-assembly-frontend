'use client'

import { Checkbox } from '@/common/components/Checkbox/Checkbox'
import { Icon } from '@/common/components/Icon/Icon'
import { Typography } from '@/common/components/Typography/Typography'
import { useOnClickOutside } from '@/common/hooks/useOutsideClick'
import { cn } from '@/common/utils/cn'
import { useId, useRef, useState } from 'react'

const SEARCH_THRESHOLD = 10

type SelectProps = {
  label: string
  displayLabel?: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  textColor?: string
  className?: string
}

export function Select({
  label,
  displayLabel,
  options,
  value,
  onChange,
  className,
  textColor,
}: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
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
          variant='body'
        >
          {displayLabel ?? label}
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
            {filteredOptions.map((option, i) => (
              <Checkbox
                key={option}
                id={`${checkboxId}-${option}`}
                name={label}
                value={option}
                label={option}
                checked={value.includes(option)}
                onChange={() => handleSelect(option)}
                size='sm'
                className={cn(
                  'hover:bg-light-blue has-[:focus-visible]:bg-light-blue px-4 py-2 has-[:focus-visible]:outline-2',
                  i === filteredOptions.length - 1 && 'rounded-b-3xl',
                )}
                labelClassName='truncate'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
