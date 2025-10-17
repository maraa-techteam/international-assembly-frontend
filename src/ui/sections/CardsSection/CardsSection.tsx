import { CardSectionProps } from '@/types/Sections'
import CardGroup from '@/ui/components/CardGroup/CardGroup'
import Section from '@/ui/components/Section/Section'
import Typography from '@/ui/components/Typography/Typography'
import { FC } from 'react'

const CardSection: FC<CardSectionProps> = ({ title, cards, type }) => {
  return (
    <Section variant='single-column' alignment='start' color={'white'}>
      <Typography variant='h2' font='mono'>
        {title}
      </Typography>
      <CardGroup
        type={type}
        isScrollable={type === 'article' ? false : true}
        columns={type === 'article' ? 2 : type === 'book' ? 4 : 3}
        cards={cards}
      />
    </Section>
  )
}

export default CardSection
