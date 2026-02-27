'use client'

import { Button, Icon, Loader, Select, Typography } from '@/common/components'
import { Grid } from '@/common/layouts'
import { cn } from '@/common/utils/cn'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { Search } from '../components/Search/Search'

type FilterOptions = {
  country: string[]
  presence: string[]
  schedule: string[]
  searchValue: string
}

export function GroupsFilterDashboard({
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

  return (
    <form
      action={variant === 'widget' ? `groups/${pathname}` : pathname}
      method='get'
      id='groups-filter'
      onSubmit={() => setIsSubmitting(true)}
      className={cn(
        'bg-light-blue flex w-full flex-col gap-4 p-4 lg:mx-0 lg:rounded-2xl',
        className,
      )}
    >
      {variant !== 'widget' && (
        <Search
          placeholder='Введите название группы'
          value={appliedFilters.searchValue}
          onDebouncedChange={handleSearchChange}
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
          label='Формат'
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
            disabled={!isOptionsSelected || isSubmitting}
            color='secondary'
            className='w-full gap-4'
            size='sm'
            type='submit'
          >
            <Typography variant='caption' className='font-medium' font='roboto'>
              Поиск
            </Typography>
            {isSubmitting ? <Loader /> : <Icon icon='arrow-right' size='md' />}
          </Button>
        )}
      </Grid>

      {variant !== 'widget' && (
        <div className='flex w-full flex-col items-center gap-4 lg:flex-row lg:justify-between'>
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
            {isResetting && <Loader />}
          </Link>

          <Button
            type='submit'
            variant='contained'
            disabled={!isOptionsSelected || isSubmitting}
            color='primary'
            className='w-full gap-4 lg:max-w-75'
            size='sm'
          >
            <Typography variant='caption' className='font-medium' font='roboto'>
              Поиск
            </Typography>
            {isSubmitting ? <Loader /> : <Icon icon='arrow-right' size='md' />}
          </Button>
        </div>
      )}
    </form>
  )
}
