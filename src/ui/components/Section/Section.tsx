import { cn } from '@/lib/utils/cn'
import { SectionProps } from '@/types/components'
import { type VariantProps, cva } from 'class-variance-authority'

const sectionVariants = cva(
  'px-4 py-6 gap-4 md:gap-6 flex flex-col lg:px-18 lg:py-6',
  {
    variants: {
      color: {
        white: 'bg-white',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        foreground: 'bg-foreground',
        contrast: 'bg-contrast',
      },
      alignment: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
      },
    },
    defaultVariants: {
      color: 'white',
      alignment: 'start',
    },
  },
)

export type SectionVariantProps = VariantProps<typeof sectionVariants>

export function Section({
  children,
  className,
  color = 'white',
  alignment = 'start',
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ color, alignment }), className)}>
      {children}
    </section>
  )
}
