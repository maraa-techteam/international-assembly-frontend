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
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

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

  const [options, setOptions] = useState<FilterOptions>({
    country: [],
    presence: [],
    schedule: [],
    searchValue: '',
  })

  const [isOptionsSelected, setIsOptionsSelected] = useState<boolean>(false)

  const [urlParams, setUrlParams] = useState<URLSearchParams>(
    new URLSearchParams(),
  )

  useEffect(
    () =>
      options.country.length > 0 ||
      options.presence.length > 0 ||
      options.schedule.length > 0 ||
      options.searchValue
        ? setIsOptionsSelected(true)
        : setIsOptionsSelected(false),
    [options],
  )

  const resetOptions = useCallback(() => {
    setOptions({
      country: [],
      presence: [],
      schedule: [],
      searchValue: '',
    })
    router.push(pathname)
  }, [router, pathname])

  const handleSelectChange = useCallback(
    (
      field: 'country' | 'presence' | 'schedule' | 'searchValue',
      value: string[],
    ) => {
      if (!value.length) router.push(pathname)
      setOptions((prev) => ({ ...prev, [field]: value }))
    },
    [pathname, router],
  )

  const handleSearchChange = useCallback((value: string) => {
    setOptions((prev) => ({ ...prev, searchValue: value }))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isOptionsSelected) {
      const params = new URLSearchParams()

      if (options.country.length > 0) {
        params.set('country', options.country.join(','))
      }
      if (options.presence.length > 0) {
        params.set('presence', options.presence.join(','))
      }
      if (options.schedule.length > 0) {
        params.set('schedule_slots', options.schedule.join(','))
      }
      if (options.searchValue.trim()) {
        params.set('searchValue', options.searchValue)
      }

      setUrlParams(params)
      router.push(`${pathname}?${params.toString()}`)
    }
  }

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
          isExpanded={true}
          //HERE I HAVE TO RESET SEARCH VALUE WHEN FILTERS ARE RESET, NOT BASED ON searchValue ITSELF
          isReseted={!options.searchValue}
          onSearch={handleSearchChange}
        />
      )}

      <Grid columns={3}>
        <Select
          label={'Страна'}
          value={options.country}
          options={dropdownOptions.country}
          textColor={variant === 'widget' ? 'text-primary' : 'text-foreground'}
          onChange={(value) => handleSelectChange('country', value)}
        />
        <Select
          label={'Присутствие'}
          value={options.presence}
          options={dropdownOptions.presence}
          textColor={variant === 'widget' ? 'text-primary' : 'text-foreground'}
          onChange={(value) => handleSelectChange('presence', value)}
        />
        {variant !== 'widget' && (
          <Select
            label={'Расписание'}
            value={options.schedule}
            options={dropdownOptions.schedule}
            textColor={
              variant === 'widget' ? 'text-primary' : 'text-foreground'
            }
            onChange={(value) => handleSelectChange('schedule', value)}
          />
        )}
        {variant === 'widget' && (
          <Button
            variant={'contained'}
            disabled={!isOptionsSelected}
            type='submit'
            color='secondary'
            as='button'
            className='w-full gap-4'
            size={'sm'}
            onClick={handleSubmit}
          >
            <Typography
              variant={'caption'}
              className='font-medium'
              font={'roboto'}
            >
              Поиск
            </Typography>
            <Icon icon='arrow-right' size={'md'} />
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
                (!isOptionsSelected || !urlParams.toString()) &&
                  'cursor-not-allowed text-gray-400',
              )}
              variant={'caption'}
            >
              Сбросить фильтры
            </Typography>
          </button>
          <Button
            variant={'contained'}
            disabled={!isOptionsSelected}
            type='submit'
            color='primary'
            as='button'
            className='w-full gap-4 lg:max-w-75'
            size={'sm'}
            onClick={handleSubmit}
          >
            <Typography
              variant={'caption'}
              className='font-medium'
              font={'roboto'}
            >
              Поиск
            </Typography>
            <Icon icon='arrow-right' size={'md'} />
          </Button>
        </div>
      )}
    </div>
  )
}
