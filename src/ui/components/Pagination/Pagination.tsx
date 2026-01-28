'use client'

import { Button } from '@/ui/components'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type PaginationProps = {
  totalCount: number
  currentPage: number
  limit: number
}

export function Pagination({
  totalCount,
  currentPage,
  limit,
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleLoadMore = () => {
    const nextPage = currentPage + 1
    const params = new URLSearchParams(searchParams.toString())

    params.set('page', nextPage.toString())

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const hasMore = totalCount > currentPage * limit

  if (!hasMore) return null

  return (
    <div className='flex justify-center'>
      <Button
        onClick={handleLoadMore}
        variant='contained'
        size='sm'
        color='primary'
      >
        Показать ещё
      </Button>
    </div>
  )
}
