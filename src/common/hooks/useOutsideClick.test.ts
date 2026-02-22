import { renderHook } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { createRef } from 'react'

import { useOnClickOutside } from './useOutsideClick'

describe('useOnClickOutside', () => {
  it('calls handler when clicking outside the ref element', () => {
    const handler = jest.fn()
    const ref = createRef<HTMLDivElement>()

    const div = document.createElement('div')
    document.body.appendChild(div)
    ;(ref as React.MutableRefObject<HTMLDivElement>).current = div

    renderHook(() => useOnClickOutside(ref, handler))

    fireEvent.mouseDown(document.body)

    expect(handler).toHaveBeenCalledTimes(1)

    document.body.removeChild(div)
  })

  it('does not call handler when clicking inside the ref element', () => {
    const handler = jest.fn()
    const ref = createRef<HTMLDivElement>()

    const div = document.createElement('div')
    document.body.appendChild(div)
    ;(ref as React.MutableRefObject<HTMLDivElement>).current = div

    renderHook(() => useOnClickOutside(ref, handler))

    fireEvent.mouseDown(div)

    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(div)
  })

  it('removes event listeners on unmount', () => {
    const handler = jest.fn()
    const ref = createRef<HTMLDivElement>()

    const div = document.createElement('div')
    document.body.appendChild(div)
    ;(ref as React.MutableRefObject<HTMLDivElement>).current = div

    const { unmount } = renderHook(() => useOnClickOutside(ref, handler))

    unmount()
    fireEvent.mouseDown(document.body)

    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(div)
  })
})
