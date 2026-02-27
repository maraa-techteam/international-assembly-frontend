'use client'

import { cn } from '@/common/utils/cn'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type ImageWithSkeletonProps = ImageProps & {
  wrapperClassName?: string
}

export function ImageWithSkeleton({
  className,
  wrapperClassName,
  onLoad,
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg bg-gray-200',
        !isLoaded && 'animate-pulse',
        wrapperClassName,
      )}
    >
      <Image
        {...props}
        alt={alt}
        onLoad={(e) => {
          setIsLoaded(true)
          onLoad?.(e)
        }}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
    </div>
  )
}
