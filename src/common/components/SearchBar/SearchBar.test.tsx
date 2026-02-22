import { SearchBar } from '@/common/components'
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

  it('calls onToggle(false) when collapsing', async () => {
    const user = userEvent.setup({ delay: null })
    render(<SearchBar isExpanded={true} onToggle={onToggleMock} />)

    // there are multiple buttons in expanded state; use aria-label for the close button
    const closeButton = screen.getByRole('button', {
      name: /закрыть строку поиска/i,
    })
    await user.click(closeButton)

    expect(onToggleMock).toHaveBeenCalledWith(false)
  })
})
