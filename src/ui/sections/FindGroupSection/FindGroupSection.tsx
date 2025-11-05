'use client'

import { FindGroupSectionProps } from '@/types/Sections'
import Button from '@/ui/components/Button/Button'
import Icon from '@/ui/components/Icon/Icon'
import Section from '@/ui/components/Section/Section'
import Select from '@/ui/components/Select/Select'
import Typography from '@/ui/components/Typography/Typography'
import { FC, useEffect, useState } from 'react'

const FindGroupSection: FC<FindGroupSectionProps> = ({ title, text }) => {
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
      <Typography className='text-left' variant={'h2'} font={'mono'}>
        {title}
      </Typography>
      <Typography variant={'body'} font={'mono'}>
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
        >
          <Typography
            variant={'caption'}
            className='text-foreground font-medium'
            font={'mono'}
          >
            Поиск
          </Typography>
          <Icon icon='arrow-right' size={'md'} />
        </Button>
      </form>
    </Section>
  )
}
export default FindGroupSection
