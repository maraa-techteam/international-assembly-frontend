import { cn } from '@/lib/utils/cn'
import { FC } from 'react'

import Icon from '../Icon/Icon'

type SelectProps = {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  className?: string
}

const Select: FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        'text-primary relative inline-flex w-full items-center overflow-hidden rounded-3xl bg-white px-4 py-3 font-medium lg:max-w-[300px]',
        className,
      )}
    >
      <select
        value={value}
        name={label}
        id={`select-${label}`}
        onChange={(e) => onChange(e.target.value)}
        className='text-primary w-full cursor-pointer appearance-none bg-white font-mono whitespace-nowrap transition-colors'
      >
        <option value=''>{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Icon icon='chevron-down' size={'md'} />
    </div>
  )
}

export default Select
