import { debounce } from './debounce'

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('calls the callback after the specified delay', () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 300)

    debounced('hello')
    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(300)
    expect(callback).toHaveBeenCalledWith('hello')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does not call the callback before the delay', () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 500)

    debounced()
    jest.advanceTimersByTime(499)
    expect(callback).not.toHaveBeenCalled()
  })

  it('cancels previous call when invoked again within the delay', () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 300)

    debounced('first')
    jest.advanceTimersByTime(200)
    debounced('second')
    jest.advanceTimersByTime(300)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('second')
  })
})
