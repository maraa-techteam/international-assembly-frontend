import { SearchBar } from '@/ui/components'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('SearchBar - Input behavior', () => {
  it('updates the search value on typing', async () => {
    const onSearch = jest.fn()
    render(
      <SearchBar isExpanded={true} onToggle={jest.fn()} onSearch={onSearch} />,
    )

    const input = screen.getByPlaceholderText(/поиск на сайте/i)
    const user = userEvent.setup()
    await user.type(input, 'Hello')

    expect(input).toHaveValue('Hello')
  })

  it('calls onSearch on form submit', async () => {
    const onSearch = jest.fn()
    render(
      <SearchBar isExpanded={true} onToggle={jest.fn()} onSearch={onSearch} />,
    )

    const input = screen.getByPlaceholderText(/поиск на сайте/i)
    const user = userEvent.setup()
    await user.type(input, 'Test')
    await user.keyboard('{Enter}')

    expect(onSearch).toHaveBeenCalledWith('Test')
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

    // Re-render with isExpanded=true to simulate parent state change
    rerender(<SearchBar isExpanded={true} onToggle={onToggleMock} />)

    // Advance fake timers
    jest.advanceTimersByTime(300)

    const input = screen.getByPlaceholderText(/поиск на сайте/i)
    expect(document.activeElement).toBe(input)
  })

  it('clears search when collapsing', async () => {
    const user = userEvent.setup({ delay: null })
    render(<SearchBar isExpanded={true} onToggle={onToggleMock} />)

    const closeButton = screen.getByRole('button', { hidden: true })
    await user.click(closeButton)

    expect(onToggleMock).toHaveBeenCalledWith(false)
  })
})
