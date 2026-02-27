import { cn } from '@/common/utils/cn'

export function Loader({ className }: { className?: string }) {
  return (
    <span
      role='status'
      aria-label='Загрузка'
      className={cn(
        'inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent',
        className,
      )}
    />
  )
}
