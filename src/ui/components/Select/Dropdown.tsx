'use client'

import { cn } from '@/lib/utils/cn'
import { Icon } from '@/ui/components'
import { useEffect, useState } from 'react'

type DropdownProps = {
  options: string[]
  onChange: (value: string) => void
  isOpen: boolean
}

export function Dropdown({ options, onChange, isOpen }: DropdownProps) {
  const optionsTransformed = options.map((option) => ({
    label: option,
    isSelected: false,
  }))

  const [dropdownOptions, setDropdownOptions] = useState(optionsTransformed)

  const handleSelect = (label: string) => {
    setDropdownOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.label === label) {
          return { ...option, isSelected: !option.isSelected }
        }
        return option
      })
    })
  }

  useEffect(() => {
    const selectedOptions = dropdownOptions
      .filter((option) => option.isSelected)
      .map((option) => option.label)
      .join(',')
    onChange(selectedOptions)
  }, [dropdownOptions, onChange])

  return (
    <div
      className={cn(
        'absolute top-full z-10 flex w-full flex-col rounded-b-3xl bg-white',
        !isOpen && 'hidden',
      )}
    >
      {dropdownOptions.map((option, i) => {
        return (
          <label
            role='option'
            aria-selected={option.isSelected}
            key={i}
            className={cn(
              'hover:bg-light-blue flex cursor-pointer items-center px-4 py-2',
              i === options.length - 1 && 'rounded-b-3xl',
            )}
          >
            {/* visually-hidden native checkbox for accessibility */}
            <input
              type='checkbox'
              checked={option.isSelected}
              onChange={() => handleSelect(option.label)}
              className='sr-only'
              aria-label={String(option)}
            />

            {/* custom checkbox */}
            <span
              className={cn(
                'mr-3 flex h-4 w-4 items-center justify-center rounded-sm border transition-colors',
                option.isSelected
                  ? 'bg-primary border-primary text-white'
                  : 'border-gray-300 bg-white',
              )}
              aria-hidden='true'
            >
              {option.isSelected && (
                <Icon
                  icon='check'
                  size={'sm'}
                  className='pointer-events-none'
                />
              )}
            </span>
            <span className='truncate'>{option.label}</span>
          </label>
        )
      })}
    </div>
  )
}
