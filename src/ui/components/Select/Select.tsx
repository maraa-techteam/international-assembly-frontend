'use client'

import { useOnClickOutside } from '@/lib/hooks/useOutsideClick'
import { cn } from '@/lib/utils/cn'
import { SelectProps } from '@/types/components'
import { Icon, Typography } from '@/ui/components'
import { useEffect, useRef, useState } from 'react'

export function Select({
  label,
  options,
  onChange,
  className,
  textColor,
}: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownOptions, setDropdownOptions] = useState(
    options.map((option) => ({
      label: option,
      isSelected: false,
    })),
  )
  const selectRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(selectRef, () => {
    setIsDropdownOpen(false)
  })

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleSelect = (optionLabel: string) => {
    setDropdownOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.label === optionLabel) {
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

  const selectedCount = dropdownOptions.filter((opt) => opt.isSelected).length

  const resetOptions = () => {
    setDropdownOptions((prevOptions) =>
      prevOptions.map((option) => ({
        ...option,
        isSelected: false,
      })),
    )
  }

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
        ref={selectRef}
        className={cn(
          'absolute top-full z-10 flex w-full flex-col rounded-b-3xl bg-white',
          !isDropdownOpen && 'hidden',
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
              <input
                type='checkbox'
                checked={option.isSelected}
                onChange={() => handleSelect(option.label)}
                className='sr-only'
                aria-label={option.label}
              />

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
    </div>
  )
}
