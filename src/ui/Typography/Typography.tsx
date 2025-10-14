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
            'text-foreground text-4xl font-bold',
            font === 'slab' ? 'font-slab' : 'font-mono',
            className,
          )}
        >
          {children}
        </h1>
      )
    case 'h2':
      return <h2 className={cn('')}>{children}</h2>
    case 'h3':
      return <h3 className={cn('')}>{children}</h3>
    case 'body':
      return (
        <p
          className={cn(
            'text-foreground text-base font-normal',
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
            'text-foreground text-base font-normal',
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
