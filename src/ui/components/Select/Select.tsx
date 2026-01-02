'use client'

import { cn } from '@/lib/utils/cn'
import { SelectProps } from '@/types/components'
import { Icon, Typography } from '@/ui/components'
import { useState } from 'react'

export function Select({
  label,
  options,
  value,
  onChange,
  className,
  customDropdown = false,
  textColor,
}: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () =>
    customDropdown && setIsDropdownOpen(!isDropdownOpen)

  return (
    <div className='relative flex w-full lg:max-w-75'>
      <div
        className={cn(
          'inline-flex w-full items-center overflow-hidden rounded-3xl bg-white font-medium',
          className,
          isDropdownOpen && 'rounded-b-none',
        )}
        onClick={toggleDropdown}
      >
        <label
          htmlFor={label}
          className='sr-only'
        >{`Выберите вариант: ${label}`}</label>
        {!customDropdown ? (
          <select
            value={value}
            name={label}
            id={label}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'text-primary font-roboto w-full cursor-pointer appearance-none bg-white px-4 py-3 pr-12 whitespace-nowrap transition-colors focus:outline-none',
              textColor,
            )}
          >
            <option value=''>{label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <>
            <Typography
              className='font-roboto w-full cursor-pointer appearance-none bg-white px-4 py-3 pr-12 whitespace-nowrap transition-colors'
              variant={'caption'}
            >
              {value || label}
            </Typography>
            <div
              className={cn(
                'absolute top-full z-1 flex w-full flex-col rounded-b-3xl bg-white',
                isDropdownOpen ? 'flex' : 'hidden',
              )}
            >
              {options.map((option, i) => {
                return (
                  <button
                    role='option'
                    aria-selected={value === option}
                    className={cn(
                      'hover:bg-light-blue flex cursor-pointer flex-row px-4 py-2',
                      i === options.length - 1 && 'rounded-b-3xl',
                    )}
                    key={i}
                    onClick={() => {
                      onChange(option)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </>
        )}

        <Icon
          icon='chevron-down'
          className={cn('pointer-events-none absolute right-4', textColor)}
          size={'md'}
        />
      </div>
    </div>
  )
}
