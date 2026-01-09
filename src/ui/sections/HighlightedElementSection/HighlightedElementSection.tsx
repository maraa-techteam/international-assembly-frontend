import { HighlightedElementSection as HighlightedElementSectionProps } from '@/types/sections'
import {
  ArticleCard,
  RichTextPreview,
  Section,
  Typography,
} from '@/ui/components'

export function HighlightedElementSection({
  title,
  headingLevel,
  text,
  primary_item,
}: HighlightedElementSectionProps) {
  return (
    <Section color={'white'}>
      <Typography variant={headingLevel} font='roboto'>
        {title}
      </Typography>
      <RichTextPreview htmlContent={text} />
      <ArticleCard isHighlighted className='max-w-full' {...primary_item} />
    </Section>
  )
}
