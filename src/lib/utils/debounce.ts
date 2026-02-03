export const debounce = (
  callback: (...args: any[]) => void,
  wait: number,
): ((...args: any[]) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args) => {
    clearTimeout(timeoutId!)
    timeoutId = setTimeout(() => callback(...args), wait)
  }
}
