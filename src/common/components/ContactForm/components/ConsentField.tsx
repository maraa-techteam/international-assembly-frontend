import { cn } from '@/common/utils/cn'
import Link from 'next/link'
import type { UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  id: string
  registration: UseFormRegisterReturn
  error?: string
}

/**
 * Explicit consent for the special-category data a message to an AA service
 * body is liable to contain.
 *
 * Art. 9(1) GDPR prohibits processing health data outright unless one of the
 * exceptions in 9(2) applies. Someone writing to this Assembly may well be
 * disclosing a drinking problem, which is health data, and the non-profit
 * exemption in 9(2)(d) reaches only members and people already in regular
 * contact — not a stranger's first message. That leaves 9(2)(a), explicit
 * consent, which is why this is its own unticked box with its own wording
 * rather than a line of small print under the submit button.
 *
 * Do not give it a `defaultChecked`: consent that arrives pre-given is not
 * consent, and a pre-ticked box is the single most commonly cited failure in
 * enforcement decisions on this article.
 */
export function ConsentField({ id, registration, error }: Props) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex flex-row items-start gap-3'>
        <input
          id={id}
          type='checkbox'
          className={cn(
            'accent-primary border-primary/20 mt-0.5 size-5 shrink-0 cursor-pointer rounded border bg-white',
            error && 'outline outline-red-400',
          )}
          {...registration}
        />
        <label htmlFor={id} className='text-foreground cursor-pointer text-sm'>
          Я соглашаюсь на обработку указанных мной данных — включая сведения о
          здоровье, если я решу их сообщить — для ответа на моё обращение.
          Подробнее в{' '}
          <Link
            href='/privacy'
            className='text-primary hover:text-secondary underline'
          >
            уведомлении о конфиденциальности
          </Link>
          .
        </label>
      </div>
      {error && <span className='text-sm text-red-400'>{error}</span>}
    </div>
  )
}
