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
import { useCallback, useEffect, useState } from 'react'

type GroupsOptions = {
  country: string[]
  presence: string[]
  schedule: string[]
  searchValue: string
}

export default function GroupsFilterDashboard({
  className,
  dropdownOptions,
  // onSubmit,
  variant,
}: {
  className?: string
  dropdownOptions: Omit<GroupsOptions, 'searchValue'>
  // onSubmit: (options: GroupsOptions) => void
  variant?: 'widget'
}) {
  const [options, setOptions] = useState<GroupsOptions>({
    country: [],
    presence: [],
    schedule: [],
    searchValue: '',
  })

  const [isOptionsSelected, setIsOptionsSelected] = useState<boolean>(false)

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
  }, [])

  const handleSelectChange = useCallback(
    (field: 'country' | 'presence' | 'schedule', value: string[]) => {
      setOptions((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  const handleSearchChange = useCallback((value: string) => {
    setOptions((prev) => ({ ...prev, searchValue: value }))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isOptionsSelected) {
      const filteredOptions: Record<string, string> = {}

      if (options.country.length > 0) {
        filteredOptions.country = options.country.join(',')
      }
      if (options.presence.length > 0) {
        filteredOptions.presence = options.presence.join(',')
      }
      if (options.schedule.length > 0) {
        filteredOptions.schedule = options.schedule.join(',')
      }
      if (options.searchValue.trim()) {
        filteredOptions.searchValue = options.searchValue
      }

      // onSubmit(options)
      // const queryParams = new URLSearchParams(filteredOptions)
      // console.log(queryParams.toString())
      // resetOptions()
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
                !isOptionsSelected && 'cursor-not-allowed text-gray-400',
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
