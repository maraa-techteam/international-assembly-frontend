import { HeroSectionProps } from '@/types/Sections'
import ButtonGroup from '@/ui/components/ButtonGroup/ButtonGroup'
import Section from '@/ui/components/Section/Section'
import Typography from '@/ui/components/Typography/Typography'
import { FC } from 'react'

const HeroSection: FC<HeroSectionProps> = ({ title, buttons }) => {
  return (
    <Section
      variant='single-column'
      color={'white'}
      className='gap-8 text-center lg:gap-15 lg:py-39'
    >
      <Typography variant={'h1'} className='lg:text-5xl' font={'mono'}>
        {title}
      </Typography>
      <ButtonGroup orientation='horizontal' buttons={buttons} />
    </Section>
  )
}

export default HeroSection
