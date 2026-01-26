'use client'

import { Icon } from '../Icon/Icon'

type PaginationProps = {
  totalPages: number
}

export function Pagination({ totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const setPage = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
  }

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <button>
        <Icon className='rotate-180' icon='double-chevron-right' />
      </button>
      <button>
        <Icon className='rotate-180' icon='chevron-right' />
      </button>
      {pages.map((page) => {
        return (
          <button key={page} onClick={() => setPage(page)}>
            {page}
          </button>
        )
      })}
      <button>
        <Icon icon='chevron-right' />
      </button>
      <button>
        <Icon icon='double-chevron-right' />
      </button>
    </div>
  )
}
