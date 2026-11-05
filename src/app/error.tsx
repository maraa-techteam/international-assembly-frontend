'use client'

import { Button } from '@/common/components/Button/Button'
import { Icon } from '@/common/components/Icon/Icon'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'
import { TELEGRAM_HELP_URL } from '@/config/site'
import Link from 'next/link'

/**
 * Shown when a page fails to render, which in practice means the CMS did not
 * answer a list page. Laid out like `not-found.tsx`, with the chat-bot in view
 * because it does not depend on this site.
 *
 * The button reloads the page rather than calling Next's `reset`, which only
 * clears client state and would not request the failed server data again.
 */
export default function ErrorPage() {
  return (
    <>
      <Section className='py-0' color='white'>
        <Link
          href='/'
          className='text-foreground flex flex-row items-center gap-4 self-start'
        >
          <Icon icon='arrow-left' />
          Домой
        </Link>
        <Typography variant='h1'>Не удалось загрузить страницу</Typography>
      </Section>
      <Section
        className='items-start lg:max-w-250 lg:pt-0 lg:pr-0'
        color='white'
      >
        <Typography variant='body'>
          Сейчас эта страница недоступна. Попробуйте обновить её через несколько
          минут.
        </Typography>
        <Typography variant='body'>
          Если вам нужна помощь прямо сейчас, напишите нам в анонимный чат в
          Telegram.
        </Typography>
        <Link
          href={TELEGRAM_HELP_URL}
          className='text-primary flex flex-row items-center gap-4 underline'
        >
          <Icon icon='telegram' />
          Связаться с сообществом
        </Link>
        <Button
          variant='contained'
          size='lg'
          color='primary'
          onClick={() => window.location.reload()}
        >
          Обновить страницу
        </Button>
      </Section>
    </>
  )
}
