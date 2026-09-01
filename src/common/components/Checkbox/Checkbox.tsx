import { Icon } from '@/common/components/Icon/Icon'
import { cn } from '@/common/utils/cn'
import type { ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

const boxSizes = {
  sm: 'size-4',
  md: 'size-5',
}

type CheckboxProps = {
  id: string
  /** A node rather than a string, so callers can pass links or markup. */
  label: ReactNode
  /** Controlled use. Leave unset when passing `registration`. */
  checked?: boolean
  onChange?: () => void
  /** react-hook-form use. Spread last, so it wins over `checked`/`onChange`. */
  registration?: UseFormRegisterReturn
  /** Message to show beneath the row; also reddens the box. */
  error?: string
  size?: keyof typeof boxSizes
  name?: string
  value?: string
  /** Styles the clickable row. */
  className?: string
  /** Styles the label text only. */
  labelClassName?: string
}

/**
 * A checkbox with a drawn box rather than the browser's own, so it looks the
 * same in every browser and can carry the brand colours.
 *
 * The real `input` is kept in the DOM as `sr-only` instead of being replaced by
 * a styled `div`: keyboard operation, screen-reader semantics and form
 * submission then all keep working without this component reimplementing them.
 *
 * It sits immediately before the drawn box so the box can be styled with
 * `peer-checked`. That detail is what lets one component serve both a
 * controlled caller and an uncontrolled react-hook-form one — the box follows
 * the input's real DOM state, so the component never needs to be told which
 * kind of caller it has.
 */
export function Checkbox({
  id,
  label,
  checked,
  onChange,
  registration,
  error,
  size = 'md',
  name,
  value,
  className,
  labelClassName,
}: CheckboxProps) {
  return (
    <div className='flex flex-col gap-1'>
      <label
        htmlFor={id}
        className={cn('flex cursor-pointer items-center gap-3', className)}
      >
        <input
          id={id}
          type='checkbox'
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className='peer sr-only'
          {...registration}
        />
        {/* Hidden from assistive tech: the input beside it already carries the
            checkbox role and its state. */}
        <span
          aria-hidden='true'
          className={cn(
            'flex shrink-0 items-center justify-center rounded-sm border border-gray-300 bg-white text-transparent transition-colors',
            'peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white',
            'peer-focus-visible:outline-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
            error && 'border-red-400',
            boxSizes[size],
          )}
        >
          <Icon icon='check' size='sm' className='pointer-events-none' />
        </span>
        <span className={labelClassName}>{label}</span>
      </label>
      {error && <span className='text-sm text-red-400'>{error}</span>}
    </div>
  )
}
