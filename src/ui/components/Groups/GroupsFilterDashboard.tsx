'use client'

import { cn } from '@/lib/utils/cn'
import {
  Button,
  Grid,
  Icon,
  SearchBar,
  Select,
  Typography,
} from '@/ui/components'
import next from 'next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

export type FilterOptions = {
  country: string[]
  presence: string[]
  schedule: string[]
  searchValue: string
}

export default function GroupsFilterDashboard({
  className,
  dropdownOptions,
  variant,
}: {
  className?: string
  dropdownOptions: Omit<FilterOptions, 'searchValue'>
  variant?: 'widget'
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const appliedFilters: FilterOptions = useMemo(
    () => ({
      country: searchParams.get('country')?.split(',') ?? [],
      presence: searchParams.get('presence')?.split(',') ?? [],
      schedule: searchParams.get('schedule_slots')?.split(',') ?? [],
      searchValue: searchParams.get('searchValue') ?? '',
    }),
    [searchParams],
  )

  const [draft, setDraft] = useState<FilterOptions>(appliedFilters)

  useEffect(() => {
    setDraft(appliedFilters)
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

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams()

    if (draft.country.length) {
      params.set('country', draft.country.join(','))
    }
    if (draft.presence.length) {
      params.set('presence', draft.presence.join(','))
    }
    if (draft.schedule.length) {
      params.set('schedule_slots', draft.schedule.join(','))
    }
    if (draft.searchValue.trim()) {
      params.set('searchValue', draft.searchValue.trim())
    }

    router.push(`${pathname}?${params.toString()}`)
  }, [draft, pathname, router])

  const resetOptions = useCallback(() => {
    setDraft({
      country: [],
      presence: [],
      schedule: [],
      searchValue: '',
    })
    router.push(pathname)
  }, [router, pathname])

  return (
    <div
      className={cn(
        'bg-light-blue flex w-full flex-col gap-4 p-4 lg:mx-0 lg:rounded-2xl',
        className,
      )}
    >
      {variant !== 'widget' && (
        <SearchBar
          placeholder='Введите название группы'
          className='w-full rounded-2xl'
          isExpanded
          onSearch={handleSearchChange}
        />
      )}

      <Grid columns={3}>
        <Select
          label='Страна'
          value={draft.country}
          options={dropdownOptions.country}
          textColor={variant === 'widget' ? 'text-primary' : 'text-foreground'}
          onChange={(value) => handleSelectChange('country', value)}
        />

        <Select
          label='Присутствие'
          value={draft.presence}
          options={dropdownOptions.presence}
          textColor={variant === 'widget' ? 'text-primary' : 'text-foreground'}
          onChange={(value) => handleSelectChange('presence', value)}
        />

        {variant !== 'widget' && (
          <Select
            label='Расписание'
            value={draft.schedule}
            options={dropdownOptions.schedule}
            textColor={
              variant === 'widget' ? 'text-primary' : 'text-foreground'
            }
            onChange={(value) => handleSelectChange('schedule', value)}
          />
        )}

        {variant === 'widget' && (
          <Button
            variant='contained'
            disabled={!isOptionsSelected}
            color='secondary'
            className='w-full gap-4'
            size='sm'
            onClick={applyFilters}
          >
            <Typography variant='caption' className='font-medium' font='roboto'>
              Поиск
            </Typography>
            <Icon icon='arrow-right' size='md' />
          </Button>
        )}
      </Grid>

      {variant !== 'widget' && (
        <div className='align-end flex w-full flex-col gap-4 lg:flex-row lg:justify-between'>
          <button
            onClick={resetOptions}
            className='w-fit self-end'
            disabled={!isOptionsSelected}
          >
            <Typography
              className={cn(
                !isOptionsSelected && 'cursor-not-allowed text-gray-400',
              )}
              variant='caption'
            >
              Сбросить фильтры
            </Typography>
          </button>

          <Button
            variant='contained'
            disabled={!isOptionsSelected}
            color='primary'
            className='w-full gap-4 lg:max-w-75'
            size='sm'
            onClick={applyFilters}
          >
            <Typography variant='caption' className='font-medium' font='roboto'>
              Поиск
            </Typography>
            <Icon icon='arrow-right' size='md' />
          </Button>
        </div>
      )}
    </div>
  )
}
