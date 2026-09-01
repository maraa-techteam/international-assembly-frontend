import { cn } from '@/common/utils/cn'
import { cva } from 'class-variance-authority'

const typographyVariants = cva('text-contrast wrap-break-word', {
  variants: {
    variant: {
      h1: 'text-2xl font-bold lg:text-[32px]',
      h2: 'text-lg font-bold lg:text-3xl',
      h3: 'text-base font-bold lg:text-lg',
      body: 'text-base font-normal',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

type HeadingLevel = 'h1' | 'h2' | 'h3'

type OtherTypographyVariant = 'body'

type TypographyVariant = HeadingLevel | OtherTypographyVariant

type TypographyProps = {
  variant: TypographyVariant
  children: React.ReactNode
  className?: string
}

export function Typography({
  variant = 'body',
  children,
  className,
}: TypographyProps) {
  const Component = variant === 'body' ? 'p' : variant

  return (
    <Component className={cn(typographyVariants({ variant }), className)}>
      {children}
    </Component>
  )
}

export default Typography
