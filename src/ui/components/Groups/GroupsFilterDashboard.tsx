'use client'

import { Grid, SearchBar, Select } from '@/ui/components'
import { useEffect, useState } from 'react'

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

  const handleChange = (
    field: 'country' | 'presence' | 'schedule' | 'searchValue',
    value: string,
  ) => setOptions((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isOptionsSelected) {
      const queryParams = new URLSearchParams(options).toString()
      window.location.href = `/groups?${queryParams}`
    }
  }

  // const [isOptionsSelected, setIsOptionsSelected] = useState<boolean>(false)

  return (
    <div className='bg-light-blue flex w-full flex-col gap-4 p-4 lg:mx-0 lg:rounded-2xl'>
      <SearchBar
        placeholder='Введите название группы'
        className='w-full rounded-2xl'
        onToggle={() => null}
        isExpanded={true}
      />
      <Grid columns={3}>
        <Select
          label={'Страна'}
          customDropdown={true}
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
          value={options.country}
          textColor='text-foreground'
          onChange={(value) => handleChange('country', value)}
        />
        <Select
          label={'Присутствие'}
          customDropdown={true}
          className='text-foreground'
          options={['Онлайн', 'Офлайн', 'Гибрид']}
          value={options.presence}
          textColor='text-foreground'
          onChange={(value) => handleChange('presence', value)}
        />

        <Select
          label={'Расписание'}
          customDropdown={true}
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
          value={options.schedule}
          textColor='text-foreground'
          onChange={(value) => handleChange('schedule', value)}
        />
      </Grid>
    </div>
  )
}
