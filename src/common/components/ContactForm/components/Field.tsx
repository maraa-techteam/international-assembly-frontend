import { cn } from '@/common/utils/cn'
import type { UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  id: string
  variant: 'name' | 'email' | 'subject' | 'message'
  registration: UseFormRegisterReturn
  error?: string
}

export const inputClasses =
  'w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-base text-foreground placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors'

export const errorInputClasses =
  'border-red-500/20 focus:border-red-500/20 focus:ring-red-500/20'

export function Field({ id, variant, registration, error }: Props) {
  // Art. 5(1)(c) data minimisation and AA's own tradition of anonymity point
  // the same way here: the Assembly has no use for a legal name, so the field
  // asks for whatever the person wants to be called and never verifies it.
  const label =
    variant === 'name'
      ? 'Ваше имя или псевдоним'
      : variant === 'email'
        ? 'Ваш e-mail'
        : variant === 'subject'
          ? 'Тема сообщения'
          : 'Ваше сообщение'
  return (
    <div className='flex flex-col gap-1'>
      <label className='sr-only' htmlFor={id}>
        {label}
      </label>
      {variant === 'message' ? (
        <textarea
          id={id}
          rows={5}
          placeholder={label}
          className={cn(
            inputClasses,
            'resize-none',
            error && errorInputClasses,
          )}
          {...registration}
        />
      ) : (
        <input
          id={id}
          type={variant === 'email' ? 'email' : 'text'}
          placeholder={label}
          className={cn(inputClasses, error && errorInputClasses)}
          {...registration}
        />
      )}
      {error && <span className='text-sm text-red-400'>{error}</span>}
    </div>
  )
}
