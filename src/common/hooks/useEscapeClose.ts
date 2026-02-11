import { useEffect } from 'react'

export const useEscapeClose = (callback: () => void) => {
  useEffect(() => {
    const handleEsc = (event: { key: string }) => {
      if (event.key === 'Escape') {
        callback()
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [callback])
}
