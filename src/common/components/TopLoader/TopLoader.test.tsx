import { act, render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'

import { TopLoader } from './TopLoader'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('TopLoader', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockUsePathname.mockReturnValue('/initial')
  })

  afterEach(() => {
    act(() => {
      jest.runAllTimers()
    })
    jest.useRealTimers()
  })

  it('renders nothing when idle', () => {
    const { container } = render(<TopLoader />)
    expect(container.firstChild).toBeNull()
  })

  it('shows the loader bar when navigation starts', () => {
    render(<TopLoader />)

    act(() => {
      window.history.pushState({}, '', '/new-page')
    })

    expect(screen.getByTestId('top-loader')).toBeInTheDocument()
  })

  it('hides the loader bar after navigation completes', () => {
    mockUsePathname.mockReturnValue('/initial')
    const { rerender } = render(<TopLoader />)

    act(() => {
      window.history.pushState({}, '', '/new-page')
    })

    mockUsePathname.mockReturnValue('/new-page')
    rerender(<TopLoader />)

    act(() => {
      jest.advanceTimersByTime(600)
    })

    expect(screen.queryByTestId('top-loader')).toBeNull()
  })

  it('has the correct gradient background style', () => {
    render(<TopLoader />)

    act(() => {
      window.history.pushState({}, '', '/some-page')
    })

    expect(screen.getByTestId('top-loader')).toHaveStyle(
      'background: linear-gradient(to right, #e1ebf5, #004382)',
    )
  })

  it('starts loading on popstate event', () => {
    render(<TopLoader />)

    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'))
    })

    expect(screen.getByTestId('top-loader')).toBeInTheDocument()
  })
})
