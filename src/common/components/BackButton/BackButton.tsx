'use client'

import { Icon } from '@/common/components/Icon/Icon'
import { useRouter } from 'next/navigation'

export function BackButton({ className }: { className?: string }) {
  const router = useRouter()

  return (
    <button
      type='button'
      onClick={() => router.back()}
      className={`text-foreground flex cursor-pointer items-center gap-2 bg-transparent ${className ?? ''}`}
    >
      <Icon icon='arrow-left' />
      Назад
    </button>
  )
}
