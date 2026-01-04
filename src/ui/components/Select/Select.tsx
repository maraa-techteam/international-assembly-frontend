'use client'

import { cn } from '@/lib/utils/cn'
import { SelectProps } from '@/types/components'
import { Dropdown, Icon, Typography } from '@/ui/components'
import { useState } from 'react'

export function Select({
  label,
  options,
  onChange,
  className,
  textColor,
}: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  return (
    <div className={cn('relative flex w-full', className)}>
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

        <Icon
          icon='chevron-down'
          className={cn('pointer-events-none absolute right-4', textColor)}
          size={'md'}
        />
      </div>

      <Dropdown options={options} onChange={onChange} isOpen={isDropdownOpen} />
    </div>
  )
}
