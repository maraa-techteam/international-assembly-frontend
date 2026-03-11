'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type LoaderState = 'idle' | 'loading' | 'completing'

const PROGRESS_STEPS = [
  { width: 20, delay: 0 },
  { width: 40, delay: 500 },
  { width: 60, delay: 1200 },
  { width: 80, delay: 2500 },
  { width: 90, delay: 4000 },
]

export function TopLoader() {
  const pathname = usePathname()
  const [loaderState, setLoaderState] = useState<LoaderState>('idle')
  const [scaleX, setScaleX] = useState(0)
  const prevPathname = useRef(pathname)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  function clearAllTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function startLoading() {
    clearAllTimers()
    setLoaderState('loading')
    setScaleX(0)

    PROGRESS_STEPS.forEach(({ width, delay }) => {
      const t = setTimeout(() => setScaleX(width / 100), delay)
      timers.current.push(t)
    })
  }

  function completeLoading() {
    clearAllTimers()
    setLoaderState('completing')
    setScaleX(1)

    const t = setTimeout(() => {
      setLoaderState('idle')
    }, 500)
    timers.current.push(t)
  }

  useEffect(() => {
    const originalPushState = window.history.pushState.bind(window.history)

    window.history.pushState = (
      ...args: Parameters<typeof window.history.pushState>
    ) => {
      startLoading()
      return originalPushState(...args)
    }

    const handlePopState = () => startLoading()
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.history.pushState = originalPushState
      window.removeEventListener('popstate', handlePopState)
      clearAllTimers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname
      completeLoading()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (loaderState === 'idle') return null

  return (
    <div
      data-testid='top-loader'
      aria-hidden='true'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(to right, #e1ebf5, #004382)',
        transform: `scaleX(${scaleX})`,
        transformOrigin: 'left',
        transition:
          loaderState === 'completing'
            ? 'transform 0.15s ease-out, opacity 0.3s ease 0.15s'
            : 'transform 0.3s ease',
        opacity: loaderState === 'completing' ? 0 : 1,
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  )
}
