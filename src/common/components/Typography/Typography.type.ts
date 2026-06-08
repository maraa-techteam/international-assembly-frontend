export type HeadingLevel = 'h1' | 'h2' | 'h3'

export type OtherTypographyVariant = 'body'

export type TypographyVariant = HeadingLevel | OtherTypographyVariant

export type TypographyType = {
  variant: TypographyVariant
  children: React.ReactNode
}
