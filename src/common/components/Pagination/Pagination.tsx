'use client'

import { Button, Loader } from '@/common/components'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

type PaginationProps = {
  fetchedCount: number
}

export function Pagination({ fetchedCount }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const handleLoadMore = () => {
    const currentLimit = parseInt(searchParams.get('limit') || '10', 10)
    const nextLimit = currentLimit + 10

    const params = new URLSearchParams(searchParams.toString())
    params.set('limit', nextLimit.toString())

    // ensure we don't "page" when doing load more
    params.delete('page')

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  // Show button only if we got a "full batch" (likely more exists)
  const currentLimit = parseInt(searchParams.get('limit') || '10', 10)
  const hasMore = fetchedCount >= currentLimit

  if (!hasMore) return null

  return (
    <div className='flex justify-center'>
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
    </div>
  )
}
