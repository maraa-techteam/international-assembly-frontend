'use client'

import { Button, Icon, Loader } from '@/common/components'
import { cn } from '@/common/utils/cn'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useTransition } from 'react'

const VISIBLE_PAGES = 3

type PaginationProps = {
  fetchedCount: number
  totalCount: number
  pageSize?: number
}

export function Pagination({
  fetchedCount,
  totalCount,
  pageSize = 10,
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentLimit = parseInt(
    searchParams.get('limit') || String(pageSize),
    10,
  )
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const totalPages = Math.ceil(totalCount / pageSize)

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

  const handleLoadMore = () => {
    const nextLimit = currentLimit + pageSize

    const params = new URLSearchParams(searchParams.toString())
    params.set('limit', nextLimit.toString())

    // ensure we don't "page" when doing load more
    params.delete('page')

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    params.set('limit', String(pageSize))

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  // Show "Load More" only if we got a "full batch" (likely more exists)
  const hasMore = fetchedCount >= currentLimit

  if (totalPages <= 1 && !hasMore) return null

  const navBtnClass = cn(
    'flex items-center justify-center cursor-pointer rounded p-1 text-primary transition-colors',
    'hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-30',
  )

  return (
    <div className='flex flex-col items-center gap-4'>
      {totalPages > 1 && (
        <div className='flex items-center gap-1'>
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
                page === currentPage
                  ? 'text-primary font-bold'
                  : 'text-foreground',
              )}
            >
              {page}
            </button>
          ))}

          <button
            type='button'
            aria-label='Следующая страница'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isPending || currentPage === totalPages}
            className={navBtnClass}
          >
            <Icon icon='chevron-right' size='sm' />
          </button>

          <button
            type='button'
            aria-label='Последняя страница'
            onClick={() => handlePageChange(totalPages)}
            disabled={isPending || currentPage === totalPages}
            className={navBtnClass}
          >
            <Icon icon='double-chevron-right' size='sm' />
          </button>
        </div>
      )}
      {hasMore && (
        <Button
          onClick={handleLoadMore}
          variant='contained'
          size='sm'
          color='primary'
          disabled={isPending}
        >
          Показать ещё
          {isPending && <Loader className='ml-2' />}
        </Button>
      )}
    </div>
  )
}
