import { CardSectionProps } from '@/types/sections'
import { ArticleCard, Grid, Section } from '@/ui/components'
import Typography from '@/ui/components/Typography/Typography'

export function CardSection({ title, cards, type }: CardSectionProps) {
  return (
    <Section variant='single-column' alignment='start' color={'white'}>
      <Typography variant='h2' font='mono'>
        {title}
      </Typography>
      <Grid
        isScrollable={type === 'article' ? false : true}
        columns={type === 'article' ? 2 : type === 'book' ? 4 : 3}
        gap={6}
      >
        {cards.map((card, i) => (
          <ArticleCard
            key={i}
            title={card.title}
            text={card.text}
            image={card.image}
            href={card.href}
            publishedAt={card.publishedAt}
          />
        ))}
      </Grid>
    </Section>
  )
}
