import { render, screen } from '@testing-library/react'

import { Search } from './Search'

describe('Search', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders the input with default placeholder', () => {
    render(<Search value='' onChange={jest.fn()} />)

    expect(
      screen.getByPlaceholderText('Название, тег, ключевое слово…'),
    ).toBeInTheDocument()
  })

  it('renders a custom placeholder when provided', () => {
    render(<Search value='' placeholder='Search here' onChange={jest.fn()} />)

    expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument()
  })

  it('renders input as disabled when disabled prop is true', () => {
    render(<Search value='' disabled onChange={jest.fn()} />)

    const input = screen.getByPlaceholderText('Название, тег, ключевое слово…')
    expect(input).toBeDisabled()
  })
})
