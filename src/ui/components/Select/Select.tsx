import { cn } from '@/lib/utils/cn'
import { SelectProps } from '@/types/components'
import { Icon } from '@/ui/components'

export function Select({
  label,
  options,
  value,
  onChange,
  className,
}: SelectProps) {
  return (
    <div
      className={cn(
        'relative inline-flex w-full items-center overflow-hidden rounded-3xl bg-white font-medium lg:max-w-[300px]',
        className,
      )}
    >
      <select
        value={value}
        name={label}
        id={`select-${label}`}
        onChange={(e) => onChange(e.target.value)}
        className='text-primary font-roboto w-full cursor-pointer appearance-none bg-white px-4 py-3 pr-12 whitespace-nowrap transition-colors focus:outline-none'
      >
        <option value=''>{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <Icon
        icon='chevron-down'
        className='text-primary pointer-events-none absolute right-4'
        color='primary'
        size={'md'}
      />
    </div>
  )
}
