'use client'

import { useOnClickOutside } from '@/lib/hooks/useOutsideClick'
import { cn } from '@/lib/utils/cn'
import { Icon, Typography } from '@/ui/components'
import { useRef, useState } from 'react'

type SelectProps = {
  label: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  className?: string
  textColor?: string
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
  const selectRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(selectRef, () => {
    setIsDropdownOpen(false)
  })

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleSelect = (optionLabel: string) => {
    if (value.includes(optionLabel)) {
      onChange(value.filter((item) => item !== optionLabel))
    } else {
      onChange([...value, optionLabel])
    }
  }

  const selectedCount = value.length

  return (
    <div ref={selectRef} className={cn('relative flex w-full', className)}>
      <div
        className={cn(
          'inline-flex w-full items-center overflow-hidden rounded-3xl bg-white font-medium',
          isDropdownOpen && 'rounded-b-none',
        )}
        onClick={toggleDropdown}
      >
        <label
          htmlFor={label}
          className='sr-only'
        >{`Выберите вариант: ${label}`}</label>

        <Typography
          className={cn(
            'font-roboto w-full cursor-pointer appearance-none bg-white px-4 py-3 pr-12 whitespace-nowrap transition-colors',
            textColor,
          )}
          variant={'caption'}
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
          size={'md'}
        />
      </div>

      <div
        className={cn(
          'absolute top-full z-10 hidden w-full flex-col rounded-b-3xl bg-white',
          isDropdownOpen && 'flex shadow-md',
        )}
      >
        {options.map((option, i) => {
          const isSelected = value.includes(option)

          return (
            <label
              role='option'
              aria-selected={isSelected}
              key={i}
              className={cn(
                'hover:bg-light-blue flex cursor-pointer items-center px-4 py-2',
                i === options.length - 1 && 'rounded-b-3xl',
              )}
            >
              <input
                type='checkbox'
                checked={isSelected}
                onChange={() => handleSelect(option)}
                className='sr-only'
                aria-label={option}
              />

              <span
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
                    size={'sm'}
                    className='pointer-events-none'
                  />
                )}
              </span>
              <span className='truncate'>{option}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
