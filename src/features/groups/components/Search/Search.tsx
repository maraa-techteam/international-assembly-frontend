import { Icon } from '@/common/components'
import { cn } from '@/common/utils/cn'

export function Search({
  value,
  label = 'Поиск',
  name = 'searchValue',
  placeholder = 'Название, тег, ключевое слово…',
  disabled,
  className,
  onChange,
}: {
  value: string
  label?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  onChange: (value: string) => void
}) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <label htmlFor='groups-search' className='sr-only'>
        {label}
      </label>

      <div className='relative w-full'>
        <Icon
          icon='search'
          size='md'
          className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'
        />

        <input
          id='groups-search'
          name={name}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'bg-background text-foreground placeholder:text-muted-foreground text-md h-12 w-full rounded-full px-10 py-2.5 transition outline-none',
            'border-border focus:border-primary focus:ring-primary/20 focus:ring-2',
            disabled && 'cursor-not-allowed opacity-60',
          )}
        />
      </div>
    </div>
  )
}
