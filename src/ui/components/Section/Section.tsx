import { cn } from '@/lib/utils/cn'
import { SectionProps } from '@/types/components'

export function Section({
  children,
  className,
  color,
  variant = 'single-column',
  alignment = 'start',
  leftColumn,
  rightColumn,
}: SectionProps) {
  const baseClasses = `px-4 py-6 ${alignment === 'start' ? 'justify-start' : alignment === 'center' ? 'justify-center' : 'justify-end'} flex flex-col lg:min-h-[440px] lg:px-18 lg:py-6`
  return (
    <section
      className={cn(
        baseClasses,
        className,
        color === 'primary' ? 'bg-primary' : 'bg-white',
        variant === 'double-column'
          ? 'gap-4 lg:grid lg:grid-cols-[1fr_0.5fr] lg:gap-24'
          : 'gap-4 md:gap-6',
      )}
    >
      {variant === 'double-column' ? (
        <>
          <div className='flex h-full w-full flex-col items-start justify-start gap-4 lg:gap-6'>
            {leftColumn}
          </div>
          <div className={'flex w-full lg:w-auto'}>{rightColumn}</div>
        </>
      ) : (
        children
      )}
    </section>
  )
}
