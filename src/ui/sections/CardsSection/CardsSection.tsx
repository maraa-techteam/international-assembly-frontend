import { ArticleCardSectionProps } from '@/types/sections'
import { ArticleCard, Grid, Section } from '@/ui/components'
import { Typography } from '@/ui/components'

export function ArticleCardSection({
  title,
  article_cards,
}: ArticleCardSectionProps) {
  return (
    <Section alignment='center' color={'white'}>
      <Typography variant='h2' font='roboto'>
        {title}
      </Typography>
      <Grid isScrollable columns={2} gap={6}>
        {article_cards.map((card) => {
          return (
            <ArticleCard
              key={card.title}
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
