'use client'

import { Button } from '@/ui/components'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type PaginationProps = {
  totalItems: number
}

export function Pagination({ totalItems }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialPage = Number(searchParams.get('page')) || 1
  const [page, setPage] = useState(initialPage)

  const handleLoadMore = () => {
    const nextPage = page + 1
    const params = new URLSearchParams(searchParams.toString())

    params.set('page', nextPage.toString())
    setPage(nextPage)

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const hasMore = totalItems === 10

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
