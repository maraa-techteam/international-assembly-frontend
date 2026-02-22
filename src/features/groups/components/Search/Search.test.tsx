import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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
    render(<Search value='' onDebouncedChange={jest.fn()} />)

    expect(
      screen.getByPlaceholderText('Название, тег, ключевое слово…'),
    ).toBeInTheDocument()
  })

  it('renders a custom placeholder when provided', () => {
    render(
      <Search
        value=''
        placeholder='Search here'
        onDebouncedChange={jest.fn()}
      />,
    )

    expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument()
  })

  it('calls onDebouncedChange with typed value after debounce delay', async () => {
    const onDebouncedChange = jest.fn()
    const user = userEvent.setup({ delay: null })
    render(<Search value='' onDebouncedChange={onDebouncedChange} />)

    const input = screen.getByPlaceholderText('Название, тег, ключевое слово…')
    await user.type(input, 'hello')

    expect(onDebouncedChange).not.toHaveBeenCalled()

    jest.advanceTimersByTime(300)

    expect(onDebouncedChange).toHaveBeenCalledWith('hello')
  })

  it('renders input as disabled when disabled prop is true', () => {
    render(<Search value='' disabled onDebouncedChange={jest.fn()} />)

    const input = screen.getByPlaceholderText('Название, тег, ключевое слово…')
    expect(input).toBeDisabled()
  })
})
