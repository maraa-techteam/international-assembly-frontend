'use client'

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
  country: string
  presence: string
  schedule: string
  searchValue: string
}

export default function GroupsFilterDashboard() {
  const [options, setOptions] = useState<GroupsOptions>({
    country: '',
    presence: '',
    schedule: '',
    searchValue: '',
  })

  const [isOptionsSelected, setIsOptionsSelected] = useState<boolean>(false)

  useEffect(
    () =>
      options.country ||
      options.presence ||
      options.schedule ||
      options.searchValue
        ? setIsOptionsSelected(true)
        : setIsOptionsSelected(false),
    [options],
  )

  const handleChange = useCallback(
    (
      field: 'country' | 'presence' | 'schedule' | 'searchValue',
      value: string,
    ) => setOptions((prev) => ({ ...prev, [field]: value })),
    [],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isOptionsSelected) {
      // const queryParams = new URLSearchParams(options).toString()
      console.log(options)
    }
  }

  return (
    <div className='bg-light-blue flex w-full flex-col gap-4 p-4 lg:mx-0 lg:rounded-2xl'>
      <SearchBar
        placeholder='Введите название группы'
        className='w-full rounded-2xl'
        isExpanded={true}
        onSearch={useCallback(
          (value: string) => handleChange('searchValue', value),
          [handleChange],
        )}
      />
      <Grid columns={3}>
        <Select
          label={'Страна'}
          className='text-foreground'
          options={[
            'Международные',
            'Болгария',
            'Германия',
            'Испания',
            'Италия',
            'Польша',
            'Турция',
            'Франция',
            'Чехия',
          ]}
          textColor='text-foreground'
          onChange={useCallback(
            (value) => handleChange('country', value),
            [handleChange],
          )}
        />
        <Select
          label={'Присутствие'}
          className='text-foreground'
          options={['Онлайн', 'Офлайн', 'Гибрид']}
          textColor='text-foreground'
          onChange={useCallback(
            (value) => handleChange('presence', value),
            [handleChange],
          )}
        />

        <Select
          label={'Расписание'}
          className='text-foreground'
          options={[
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
            'Воскресенье',
          ]}
          textColor='text-foreground'
          onChange={useCallback(
            (value) => {
              handleChange('schedule', value)
            },
            [handleChange],
          )}
        />
      </Grid>
      <div className='flex w-full justify-between'>
        <button>
          <Typography className='' variant={'caption'}>
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
    </div>
  )
}
