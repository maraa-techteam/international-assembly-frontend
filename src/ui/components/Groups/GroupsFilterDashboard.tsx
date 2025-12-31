'use client'

import { Grid, Select } from '@/ui/components'
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
    <div className='bg-light-blue -mx-4 flex flex-col gap-4 p-4 lg:mx-0 lg:rounded-2xl'>
      <Grid columns={3}>
        <Select
          label={'Страна'}
          isMultiSelect={true}
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
          value={''}
          onChange={() => null}
        />
      </Grid>
    </div>
  )
}
