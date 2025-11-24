'use client'

import { FindGroupSectionProps } from '@/types/sections'
import { Button, Icon, Section, Select } from '@/ui/components'
import Typography from '@/ui/components/Typography/Typography'
import { useEffect, useState } from 'react'

export function FindGroupSection({ title, text }: FindGroupSectionProps) {
  const [options, setOptions] = useState<{ country: string; presence: string }>(
    {
      country: '',
      presence: '',
    },
  )
  const [isOptionsSelected, setIsOptionsSelected] = useState<boolean>(false)

  useEffect(
    () =>
      options.country && options.presence
        ? setIsOptionsSelected(true)
        : setIsOptionsSelected(false),
    [options],
  )

  const handleChange = (field: 'country' | 'presence', value: string) =>
    setOptions((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isOptionsSelected) {
      const queryParams = new URLSearchParams(options).toString()
      window.location.href = `/groups?${queryParams}`
    }
  }

  return (
    <Section
      variant='single-column'
      alignment='center'
      className='items-start'
      color={'primary'}
    >
      <Typography className='text-left' variant={'h2'} font={'roboto'}>
        {title}
      </Typography>
      <Typography variant={'body'} font={'roboto'}>
        {text}
      </Typography>
      <form
        className='flex w-full flex-col items-center justify-start gap-4 lg:flex-row'
        onSubmit={handleSubmit}
      >
        <Select
          label={'Страна'}
          options={['China', 'USA', 'Germany']}
          value={options.country}
          onChange={(v) => handleChange('country', v)}
        />
        <Select
          label={'Присутствие'}
          options={['Онлайн', 'Офлайн']}
          value={options.presence}
          onChange={(v) => handleChange('presence', v)}
        />
        <Button
          variant={'contained'}
          disabled={!isOptionsSelected}
          type='submit'
          color='secondary'
          as='button'
          className='w-full gap-4 lg:max-w-[300px]'
          size={'sm'}
        >
          <Typography
            variant={'caption'}
            className='text-foreground font-medium'
            font={'roboto'}
          >
            Поиск
          </Typography>
          <Icon color='foreground' icon='arrow-right' size={'md'} />
        </Button>
      </form>
    </Section>
  )
}
