import { formatDate } from './dateFormatter'

describe('formatDate', () => {
  it('formats a date string in Russian locale', () => {
    const result = formatDate('2024-01-15')
    expect(result).toMatch(/январ/)
    expect(result).toMatch(/2024/)
  })

  it('includes the day number', () => {
    const result = formatDate('2024-03-05')
    expect(result).toMatch(/5/)
  })

  it('includes the year', () => {
    const result = formatDate('2023-07-20')
    expect(result).toMatch(/2023/)
  })
})
