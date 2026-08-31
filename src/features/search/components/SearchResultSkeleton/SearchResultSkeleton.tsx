import { cn } from '@/common/utils/cn'

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      aria-hidden='true'
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
    />
  )
}

function SearchResultCardSkeleton() {
  return (
    <div className='inline-flex flex-col items-start justify-start gap-4 lg:flex-row lg:gap-6'>
      <SkeletonBlock className='h-40 w-full rounded-lg lg:w-60 lg:shrink-0' />
      <div className='flex w-full flex-col items-start justify-start gap-2'>
        <SkeletonBlock className='h-8 w-28 rounded-full' />
        <SkeletonBlock className='h-6 w-3/4' />
        <SkeletonBlock className='h-4 w-full' />
        <SkeletonBlock className='h-4 w-5/6' />
      </div>
    </div>
  )
}

export function SearchResultSkeleton() {
  return (
    <div
      role='status'
      aria-label='Загрузка результатов поиска'
      className='flex flex-col gap-8'
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <SearchResultCardSkeleton key={i} />
      ))}
    </div>
  )
}
