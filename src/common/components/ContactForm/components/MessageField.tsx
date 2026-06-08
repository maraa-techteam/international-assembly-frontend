import { cn } from '@/common/utils/cn'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { errorInputClasses, inputClasses } from './fieldClasses'

type Props = {
  id: string
  registration: UseFormRegisterReturn
  error?: string
}

export function MessageField({ id, registration, error }: Props) {
  return (
    <div className='flex flex-col gap-1'>
      <label className='sr-only' htmlFor={id}>
        Сообщение
      </label>
      <textarea
        id={id}
        placeholder='Ваше сообщение'
        rows={5}
        className={cn(inputClasses, 'resize-none', error && errorInputClasses)}
        {...registration}
      />
      {error && <span className='text-sm text-red-400'>{error}</span>}
    </div>
  )
}
