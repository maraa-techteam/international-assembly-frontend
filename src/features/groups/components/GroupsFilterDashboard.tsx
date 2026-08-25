'use client'

import { Button } from '@/common/components/Button/Button'
import { Grid } from '@/common/components/Grid/Grid'
import { Icon } from '@/common/components/Icon/Icon'
import { Loader } from '@/common/components/Loader/Loader'
import { Select } from '@/common/components/Select/Select'
import { Typography } from '@/common/components/Typography/Typography'
import { cn } from '@/common/utils/cn'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { Search } from './Search/Search'

type FilterOptions = {
  country: string[]
  presence: string[]
  schedule: string[]
  searchValue: string
}

export function GroupsFilterDashboard({
  className,
  dropdownOptions,
}: {
  className?: string
  dropdownOptions: Omit<FilterOptions, 'searchValue'>
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const appliedFilters: FilterOptions = useMemo(
    () => ({
      country: searchParams.getAll('country') ?? [],
      presence: searchParams.getAll('presence') ?? [],
      schedule: searchParams.getAll('schedule_slots') ?? [],
      searchValue: searchParams.get('searchValue') ?? '',
    }),
    [searchParams],
  )

  const [draft, setDraft] = useState<FilterOptions>(appliedFilters)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    setDraft(appliedFilters)
    setIsSubmitting(false)
    setIsResetting(false)
  }, [searchParams, appliedFilters])

  const isOptionsSelected =
    draft.country.length > 0 ||
    draft.presence.length > 0 ||
    draft.schedule.length > 0 ||
    !!draft.searchValue

  const handleSelectChange = (
    field: 'country' | 'presence' | 'schedule',
    value: string[],
  ) => {
    const nextState = {
      ...draft,
      [field]: value,
    }

    const isAllEmpty =
      !nextState.country.length &&
      !nextState.presence.length &&
      !nextState.schedule.length &&
      !nextState.searchValue

    if (isAllEmpty) {
      router.push(pathname)
      return
    }

    setDraft(nextState)
  }

  const handleSearchChange = (value: string) => {
    if (
      !value &&
      !draft.country.length &&
      !draft.presence.length &&
      !draft.schedule.length
    ) {
      router.push(pathname)
    }
    setDraft((prev) => ({ ...prev, searchValue: value }))
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
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <form
      action={pathname}
      method='get'
      id='groups-filter'
      onSubmit={handleSubmit}
      className={cn(
        'bg-light-blue flex w-full flex-col gap-4 p-4 lg:mx-0 lg:rounded-2xl',
        className,
      )}
    >
      <Search
        placeholder='Введите название группы'
        value={draft.searchValue}
        onChange={handleSearchChange}
      />
      <Grid columns={3}>
        <Select
          label='country'
          displayLabel='Страна'
          value={draft.country}
          options={dropdownOptions.country}
          textColor='text-foreground'
          onChange={(value) => handleSelectChange('country', value)}
        />

        <Select
          label='presence'
          displayLabel='Формат'
          value={draft.presence}
          options={dropdownOptions.presence}
          textColor='text-foreground'
          onChange={(value) => handleSelectChange('presence', value)}
        />

        <Select
          label='schedule_slots'
          displayLabel='Расписание'
          value={draft.schedule}
          options={dropdownOptions.schedule}
          textColor='text-foreground'
          onChange={(value) => handleSelectChange('schedule', value)}
        />
      </Grid>

      <div className='flex w-full flex-col items-end gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <Link
          className={cn(
            !isOptionsSelected && 'pointer-events-none text-gray-400',
            isResetting && 'pointer-events-none',
            'inline-flex h-fit items-center gap-1',
          )}
          href={pathname}
          aria-disabled={!isOptionsSelected}
          tabIndex={isOptionsSelected ? 0 : -1}
          onClick={() => {
            if (isOptionsSelected) setIsResetting(true)
          }}
        >
          Сбросить фильтры
          {isResetting && <Loader className='ml-1 h-3 w-3' />}
        </Link>

        <Button
          type='submit'
          variant='contained'
          disabled={!isOptionsSelected || isSubmitting}
          color='primary'
          className='group w-full gap-3 lg:max-w-75'
          size='sm'
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
      </div>
    </form>
  )
}
