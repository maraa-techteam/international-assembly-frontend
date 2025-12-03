import { ArticleCardSectionProps } from '@/types/sections'
import { ArticleCard, Grid, Section } from '@/ui/components'
import Typography from '@/ui/components/Typography/Typography'

export function ArticleCardSection({
  title,
  article_cards,
  type,
}: ArticleCardSectionProps) {
  return (
    <Section variant='single-column' alignment='center' color={'white'}>
      <Typography variant='h2' font='roboto'>
        {title}
      </Typography>
      <Grid
        isScrollable={type === 'article' ? false : true}
        columns={type === 'article' ? 2 : type === 'book' ? 4 : 3}
        gap={6}
      >
        {article_cards.map((card, i) => (
          <ArticleCard
            key={i}
            title={card.title}
            perex={card.perex}
            image={card.image}
            link={card.link}
            date_created={card.date_created}
          />
        ))}
      </Grid>
    </Section>
  )
}
