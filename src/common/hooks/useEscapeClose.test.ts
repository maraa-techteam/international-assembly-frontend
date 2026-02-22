import { renderHook } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'

import { useEscapeClose } from './useEscapeClose'

describe('useEscapeClose', () => {
  it('calls callback when Escape key is pressed', () => {
    const callback = jest.fn()
    renderHook(() => useEscapeClose(callback))

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does not call callback for other keys', () => {
    const callback = jest.fn()
    renderHook(() => useEscapeClose(callback))

    fireEvent.keyDown(window, { key: 'Enter' })
    fireEvent.keyDown(window, { key: 'ArrowDown' })

    expect(callback).not.toHaveBeenCalled()
  })

  it('removes event listener on unmount', () => {
    const callback = jest.fn()
    const { unmount } = renderHook(() => useEscapeClose(callback))

    unmount()
    fireEvent.keyDown(window, { key: 'Escape' })

    expect(callback).not.toHaveBeenCalled()
  })
})
