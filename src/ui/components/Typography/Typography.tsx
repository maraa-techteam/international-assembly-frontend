import { cn } from '@/lib/utils/cn'
import { TypographyProps } from '@/types/components'
import { cva } from 'class-variance-authority'

const typographyVariants = cva('text-contrast wrap-break-word', {
  variants: {
    variant: {
      h1: 'text-2xl font-bold lg:text-4xl',
      h2: 'text-lg font-bold lg:text-3xl',
      h3: 'text-base font-bold lg:text-lg',
      body: 'max-w-200 text-base font-normal',
      caption: 'text-base font-normal',
    },
    font: {
      roboto: 'font-roboto',
      slab: 'font-slab',
    },
  },
  defaultVariants: {
    variant: 'body',
    font: 'roboto',
  },
})

export function Typography({
  variant = 'body',
  font = 'roboto',
  children,
  className,
}: TypographyProps) {
  const Component =
    variant === 'caption' ? 'span' : variant === 'body' ? 'p' : variant

  return (
    <Component className={cn(typographyVariants({ variant, font }), className)}>
      {children}
    </Component>
  )
}

export default Typography
