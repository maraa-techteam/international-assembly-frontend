'use client'

import { Button } from '@/common/components/Button/Button'
import { Grid } from '@/common/components/Grid/Grid'
import { Icon } from '@/common/components/Icon/Icon'
import { Loader } from '@/common/components/Loader/Loader'
import { Select } from '@/common/components/Select/Select'
import { Typography } from '@/common/components/Typography/Typography'
import { cn } from '@/common/utils/cn'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type FilterOptions = {
  country: string[]
  presence: string[]
}

type DropdownOptions = {
  country: string[]
  presence: string[]
}

export function GroupSearchWidget({
  className,
  dropdownOptions,
}: {
  className?: string
  dropdownOptions: DropdownOptions
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const appliedFilters: FilterOptions = useMemo(
    () => ({
      country: searchParams.getAll('country') ?? [],
      presence: searchParams.getAll('presence') ?? [],
    }),
    [searchParams],
  )

  const [draft, setDraft] = useState<FilterOptions>(appliedFilters)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setDraft(appliedFilters)
    setIsSubmitting(false)
  }, [searchParams, appliedFilters])

  const isOptionsSelected =
    draft.country.length > 0 || draft.presence.length > 0

  const handleSelectChange = (
    field: 'country' | 'presence',
    value: string[],
  ) => {
    const nextState = { ...draft, [field]: value }
    if (!nextState.country.length && !nextState.presence.length) {
      router.push(pathname)
      return
    }
    setDraft(nextState)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const data = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    for (const [key, rawValue] of data.entries()) {
      if (typeof rawValue === 'string' && rawValue !== '') {
        params.append(key, rawValue)
      }
    }
    const query = params.toString()
    router.push(query ? `groups/${pathname}?${query}` : `groups/${pathname}`)
  }

  return (
    <form
      action='/groups'
      onSubmit={handleSubmit}
      className={cn(
        'bg-light-blue flex w-full flex-col gap-4 p-4 lg:mx-0 lg:rounded-2xl',
        className,
      )}
    >
      <Grid columns={3}>
        <Select
          label='country'
          displayLabel='Страна'
          value={draft.country}
          options={dropdownOptions.country}
          textColor='text-primary'
          onChange={(value) => handleSelectChange('country', value)}
        />

        <Select
          label='presence'
          displayLabel='Формат'
          value={draft.presence}
          options={dropdownOptions.presence}
          textColor='text-primary'
          onChange={(value) => handleSelectChange('presence', value)}
        />

        <Button
          variant='contained'
          disabled={!isOptionsSelected || isSubmitting}
          color='secondary'
          className='group w-full gap-2'
          size='sm'
          type='submit'
        >
          <Typography variant='body' className='font-medium'>
            Поиск
          </Typography>
          {isSubmitting ? (
            <Loader />
          ) : (
            <Icon
              icon='arrow-right'
              className={cn(
                isOptionsSelected &&
                  'transition-transform duration-300 ease-in-out group-hover:translate-x-1',
              )}
              size='md'
            />
          )}
        </Button>
      </Grid>
    </form>
  )
}
