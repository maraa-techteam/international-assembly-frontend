import { cn } from '@/common/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'

const gridVariants = cva('w-full grid', {
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
    isScrollable: {
      true: 'overflow-x-auto',
      false: '',
    },
  },
  defaultVariants: {
    columns: 2,
    gap: 4,
    isScrollable: false,
  },
})

type GridPropsType = VariantProps<typeof gridVariants> & {
  children: React.ReactNode
  as?: 'div' | 'ul' | 'nav'
  className?: string
}

export function Grid({
  children,
  columns,
  gap,
  isScrollable,
  className,
  as: Component = 'div',
}: GridPropsType) {
  return (
    <Component
      role={Component === 'ul' ? 'list' : undefined}
      className={cn(gridVariants({ columns, gap, isScrollable }), className)}
    >
      {children}
    </Component>
  )
}
