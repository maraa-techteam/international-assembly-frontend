import { transliterate } from '@/lib/utils/transliterate'
import { ArticleCardSectionProps } from '@/types/sections'
import { ArticleCard, Grid, Section } from '@/ui/components'
import Typography from '@/ui/components/Typography/Typography'

export function ArticleCardSection({
  title,
  article_cards,
}: ArticleCardSectionProps) {
  return (
    <Section variant='single-column' alignment='center' color={'white'}>
      <Typography variant='h2' font='roboto'>
        {title}
      </Typography>
      <Grid isScrollable columns={2} gap={6}>
        {article_cards.map((card, i) => {
          return (
            <ArticleCard
              key={i}
              title={card.title}
              perex={card.perex}
              image={card.image}
              date_created={card.date_created}
            />
          )
        })}
      </Grid>
    </Section>
  )
}
