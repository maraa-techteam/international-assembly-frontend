export type HeadingVariant = 'h1' | 'h2' | 'h3'

export type OtherTypographyVariant = 'body' | 'caption'

export type TypographyVariant = HeadingVariant | OtherTypographyVariant

export type TypographyProps = {
  variant: TypographyVariant
  font?: 'slab' | 'roboto'
  children: React.ReactNode
  className?: string
}
