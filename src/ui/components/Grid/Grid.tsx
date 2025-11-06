import { cn } from '@/lib/utils/cn'
import { GridType } from '@/types/components'

type dynamicClassTypes = { [key: number]: string }

const columnClasses: dynamicClassTypes = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

const gapClasses: dynamicClassTypes = {
  1: 'gap-1 lg:gap-3',
  2: 'gap-2 lg:gap-4',
  3: 'gap-3 lg:gap-5',
  4: 'gap-4 lg:gap-6',
  5: 'gap-5 lg:gap-7',
  6: 'gap-6 lg:gap-8',
}

export function Grid({
  isScrollable,
  columns = 2,
  children,
  gap = 4,
}: GridType) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-center lg:grid',
        columnClasses[columns],
        gapClasses[gap],
        isScrollable && 'overflow-x-auto',
      )}
    >
      {children}
    </div>
  )
}
