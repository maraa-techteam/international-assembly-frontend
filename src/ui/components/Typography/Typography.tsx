import { cn } from '@/lib/utils/cn'
import { FC } from 'react'

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption'
  font: 'slab' | 'mono'
  children: React.ReactNode
  className?: string
}

const Typography: FC<TypographyProps> = ({
  variant = 'body',
  children,
  font = 'mono',
  className = '',
}) => {
  switch (variant) {
    case 'h1':
      return (
        <h1
          className={cn(
            'text-contrast text-2xl font-bold lg:text-4xl',
            font === 'slab' ? 'font-slab' : 'font-mono',
            className,
          )}
        >
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={cn('text-contrast text-lg font-bold lg:text-3xl')}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3
          className={cn(
            'text-contrast text-md font-bold lg:text-2xl',
            font === 'slab' ? 'font-slab' : 'font-mono',
            className,
          )}
        >
          {children}
        </h3>
      )
    case 'body':
      return (
        <p
          className={cn(
            'text-contrast max-w-[800px] text-base font-normal',
            font === 'slab' ? 'font-slab' : 'font-mono',
            className,
          )}
        >
          {children}
        </p>
      )
    case 'caption':
      return (
        <span
          className={cn(
            'text-contrast text-base font-normal',
            font === 'slab' ? 'font-slab' : 'font-mono',
            className,
          )}
        >
          {children}
        </span>
      )
    default:
      return <p className={cn('')}>{children}</p>
  }
}
export default Typography
