import { cn } from '@/lib/utils/cn'
import { SectionProps } from '@/types/components'
import { type VariantProps, cva } from 'class-variance-authority'

const sectionVariants = cva(
  'px-4 py-6 flex flex-col lg:min-h-[440px] lg:px-18 lg:py-6',
  {
    variants: {
      color: {
        white: 'bg-white',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        foreground: 'bg-foreground',
        contrast: 'bg-contrast',
      },
      variant: {
        'single-column': 'gap-4 md:gap-6',
        'double-column': 'gap-4 lg:grid lg:grid-cols-[1fr_0.5fr] lg:gap-24',
      },
      alignment: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
      },
    },
    defaultVariants: {
      color: 'white',
      variant: 'single-column',
      alignment: 'start',
    },
  },
)

export type SectionVariantProps = VariantProps<typeof sectionVariants>

export function Section({
  children,
  className,
  color = 'white',
  variant = 'single-column',
  alignment = 'start',
  leftColumn,
  rightColumn,
}: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ color, variant, alignment }), className)}
    >
      {variant === 'double-column' ? (
        <>
          <div className='flex h-full w-full flex-col items-start justify-start gap-4 lg:gap-6'>
            {leftColumn}
          </div>
          <div className='flex w-full lg:w-auto'>{rightColumn}</div>
        </>
      ) : (
        children
      )}
    </section>
  )
}
