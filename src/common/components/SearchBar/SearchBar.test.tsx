import { SearchBar } from '@/common/components/SearchBar/SearchBar'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('SearchBar - Input behavior', () => {
  beforeEach(() => {
    pushMock.mockClear()
  })

  it('updates the search value on typing', async () => {
    render(<SearchBar isExpanded={true} onToggle={jest.fn()} />)

    const input = screen.getByPlaceholderText(/поиск на сайте/i)
    const user = userEvent.setup()
    await user.type(input, 'Hello')

    expect(input).toHaveValue('Hello')
  })

  it('navigates to search results on form submit', async () => {
    render(<SearchBar isExpanded={true} onToggle={jest.fn()} />)

    const input = screen.getByPlaceholderText(/поиск на сайте/i)
    const user = userEvent.setup()
    await user.type(input, 'Test')
    await user.keyboard('{Enter}')

    expect(pushMock).toHaveBeenCalledWith('/search?search=Test')
  })
})

describe('SearchBar - Toggle behavior', () => {
  const onToggleMock = jest.fn()

  beforeEach(() => {
    onToggleMock.mockClear()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders collapsed state', () => {
    render(<SearchBar isExpanded={false} onToggle={onToggleMock} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('expands and focuses the input after delay', async () => {
    const user = userEvent.setup({ delay: null })
    const { rerender } = render(
      <SearchBar isExpanded={false} onToggle={onToggleMock} />,
    )

    await user.click(screen.getByRole('button'))
    expect(onToggleMock).toHaveBeenCalledWith(true)

    rerender(<SearchBar isExpanded={true} onToggle={onToggleMock} />)

    jest.advanceTimersByTime(100)

    const input = screen.getByPlaceholderText(/поиск на сайте/i)
    expect(document.activeElement).toBe(input)
  })
})

describe('SearchBar - Clear button behavior', () => {
  it('does not show clear button when input is empty', () => {
    render(<SearchBar isExpanded={true} onToggle={jest.fn()} />)

    expect(
      screen.queryByRole('button', { name: /очистить строку поиска/i }),
    ).not.toBeInTheDocument()
  })

  it('shows clear button when input has a value', async () => {
    render(<SearchBar isExpanded={true} onToggle={jest.fn()} />)
    const user = userEvent.setup()

    await user.type(screen.getByPlaceholderText(/поиск на сайте/i), 'Hello')

    expect(
      screen.getByRole('button', { name: /очистить строку поиска/i }),
    ).toBeInTheDocument()
  })

  it('clears the input value when clear button is clicked', async () => {
    render(<SearchBar isExpanded={true} onToggle={jest.fn()} />)
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText(/поиск на сайте/i)

    await user.type(input, 'Hello')
    await user.click(
      screen.getByRole('button', { name: /очистить строку поиска/i }),
    )

    expect(input).toHaveValue('')
  })

  it('keeps the input focused after clicking the clear button', async () => {
    render(<SearchBar isExpanded={true} onToggle={jest.fn()} />)
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText(/поиск на сайте/i)

    await user.type(input, 'Hello')
    await user.click(
      screen.getByRole('button', { name: /очистить строку поиска/i }),
    )

    expect(document.activeElement).toBe(input)
  })

  it('does not call onToggle when clear button is clicked', async () => {
    const onToggleMock = jest.fn()
    render(<SearchBar isExpanded={true} onToggle={onToggleMock} />)
    const user = userEvent.setup()

    await user.type(screen.getByPlaceholderText(/поиск на сайте/i), 'Hello')
    await user.click(
      screen.getByRole('button', { name: /очистить строку поиска/i }),
    )

    expect(onToggleMock).not.toHaveBeenCalled()
  })
})
