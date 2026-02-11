export type HeadingLevel = 'h1' | 'h2' | 'h3'

export type OtherTypographyVariant = 'body' | 'caption'

export type TypographyVariant = HeadingLevel | OtherTypographyVariant

export type TypographyType = {
  variant: TypographyVariant
  font?: 'slab' | 'roboto'
  children: React.ReactNode
}
