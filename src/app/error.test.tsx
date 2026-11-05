import { TELEGRAM_HELP_URL } from '@/config/site'
import { render, screen } from '@testing-library/react'

import ErrorPage from './error'

describe('ErrorPage', () => {
  it('says what happened and offers a retry', () => {
    render(<ErrorPage />)

    expect(
      screen.getByRole('heading', { name: 'Не удалось загрузить страницу' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Обновить страницу' }),
    ).toBeInTheDocument()
  })

  it('keeps the chat-bot in reach, since it does not depend on the site', () => {
    render(<ErrorPage />)

    expect(
      screen.getByRole('link', { name: 'Связаться с сообществом' }),
    ).toHaveAttribute('href', TELEGRAM_HELP_URL)
  })

  it('links back to the home page', () => {
    render(<ErrorPage />)

    expect(screen.getByRole('link', { name: 'Домой' })).toHaveAttribute(
      'href',
      '/',
    )
  })
})
