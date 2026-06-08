import { cn } from '@/common/utils/cn'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { errorInputClasses, inputClasses } from './fieldClasses'

type Props = {
  id: string
  registration: UseFormRegisterReturn
  error?: string
}

export function NameField({ id, registration, error }: Props) {
  return (
    <div className='flex flex-col gap-1'>
      <label className='sr-only' htmlFor={id}>
        Ваше имя
      </label>
      <input
        id={id}
        type='text'
        placeholder='Ваше имя'
        className={cn(inputClasses, error && errorInputClasses)}
        {...registration}
      />
      {error && <span className='text-sm text-red-400'>{error}</span>}
    </div>
  )
}
