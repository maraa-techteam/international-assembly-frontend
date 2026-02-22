import { cn } from './cn'

describe('cn utility', () => {
  it('returns a single class unchanged', () => {
    expect(cn('bg-red-500')).toBe('bg-red-500')
  })

  it('merges multiple class strings', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center')
  })

  it('ignores falsy values', () => {
    expect(cn('flex', false, null, undefined, 'gap-2')).toBe('flex gap-2')
  })

  it('resolves tailwind conflicts by keeping the last value', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
  })

  it('returns empty string when no arguments are provided', () => {
    expect(cn()).toBe('')
  })
})
