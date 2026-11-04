'use client'

import { Icon } from '@/common/components/Icon/Icon'
import { cn } from '@/common/utils/cn'
import { getTotalPages, parsePageParam } from '@/common/utils/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useTransition } from 'react'

const VISIBLE_PAGES = 3

type PaginationProps = {
  totalCount: number
}

export function Pagination({ totalCount }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentPage = parsePageParam(searchParams.get('page'))
  const totalPages = getTotalPages(totalCount)

  const visiblePages = useMemo(() => {
    if (totalPages <= VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    let start = currentPage - 1
    let end = currentPage + 1
    if (start < 1) {
      start = 1
      end = VISIBLE_PAGES
    }
    if (end > totalPages) {
      end = totalPages
      start = totalPages - VISIBLE_PAGES + 1
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [currentPage, totalPages])

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    // Links from before "load more" was removed can still carry a limit.
    params.delete('limit')

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  if (totalPages <= 1) return null

  const navBtnClass = cn(
    'flex items-center justify-center cursor-pointer rounded p-1 text-primary transition-colors',
    'hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-30',
  )

  return (
    <div className='flex items-center justify-center gap-1'>
      <button
        type='button'
        aria-label='Первая страница'
        onClick={() => handlePageChange(1)}
        disabled={isPending || currentPage === 1}
        className={navBtnClass}
      >
        <Icon icon='double-chevron-left' size='sm' />
      </button>

      <button
        type='button'
        aria-label='Предыдущая страница'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isPending || currentPage === 1}
        className={navBtnClass}
      >
        <Icon icon='chevron-left' size='sm' />
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          type='button'
          onClick={() => handlePageChange(page)}
          disabled={isPending || page === currentPage}
          className={cn(
            'min-w-8 cursor-pointer rounded px-2 py-1 text-sm transition-colors',
            'hover:bg-primary/10 disabled:cursor-default',
            page === currentPage ? 'text-primary font-bold' : 'text-foreground',
          )}
        >
          {page}
        </button>
      ))}

      <button
        type='button'
        aria-label='Следующая страница'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isPending || currentPage >= totalPages}
        className={navBtnClass}
      >
        <Icon icon='chevron-right' size='sm' />
      </button>

      <button
        type='button'
        aria-label='Последняя страница'
        onClick={() => handlePageChange(totalPages)}
        disabled={isPending || currentPage >= totalPages}
        className={navBtnClass}
      >
        <Icon icon='double-chevron-right' size='sm' />
      </button>
    </div>
  )
}
