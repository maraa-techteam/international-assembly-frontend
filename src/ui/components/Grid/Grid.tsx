import { cn } from '@/lib/utils/cn'
import { GridType } from '@/types/components'
import { VariantProps, cva } from 'class-variance-authority'

const gridVariants = cva('flex w-full flex-col lg:grid', {
  variants: {
    columns: {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      5: 'lg:grid-cols-5',
      6: 'lg:grid-cols-6',
      7: 'lg:grid-cols-7',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1 lg:gap-3',
      2: 'gap-2 lg:gap-4',
      3: 'gap-3 lg:gap-5',
      4: 'gap-4 lg:gap-6',
      5: 'gap-5 lg:gap-7',
      6: 'gap-6 lg:gap-8',
      8: 'gap-8 lg:gap-10',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    isScrollable: {
      true: 'overflow-x-auto',
      false: '',
    },
  },
  defaultVariants: {
    columns: 2,
    gap: 4,
    align: 'stretch',
    justify: 'start',
    isScrollable: false,
  },
})

type GridProps = VariantProps<typeof gridVariants> & GridType

export function Grid({
  children,
  columns,
  gap,
  align,
  justify,
  isScrollable,
  className,
  as: Component = 'div',
}: GridProps) {
  return (
    <Component
      className={cn(
        gridVariants({ columns, gap, align, justify, isScrollable }),
        className,
      )}
    >
      {children}
    </Component>
  )
}
