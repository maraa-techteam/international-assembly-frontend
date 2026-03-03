'use client'

import { Button, Loader } from '@/common/components'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useTransition } from 'react'

const PAGE_SIZE = 10

type PaginationProps = {
  fetchedCount: number
  totalCount: number
}

export function Pagination({ fetchedCount, totalCount }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentLimit = parseInt(
    searchParams.get('limit') || String(PAGE_SIZE),
    10,
  )
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  )

  const handleLoadMore = () => {
    const nextLimit = currentLimit + PAGE_SIZE

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
    params.set('limit', String(PAGE_SIZE))

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  // Show "Load More" only if we got a "full batch" (likely more exists)
  const hasMore = fetchedCount >= currentLimit

  if (totalPages <= 1 && !hasMore) return null

  return (
    <div className='flex flex-col items-center gap-4'>
      {totalPages > 1 && (
        <div className='flex flex-wrap justify-center gap-2'>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              variant={page === currentPage ? 'contained' : 'outlined'}
              size='sm'
              color='primary'
              disabled={isPending || page === currentPage}
            >
              {page}
            </Button>
          ))}
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
