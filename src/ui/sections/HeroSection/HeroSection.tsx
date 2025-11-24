import { HeroSectionProps } from '@/types/sections'
import { ButtonGroup, Section } from '@/ui/components'
import Typography from '@/ui/components/Typography/Typography'

export function HeroSection({ title, buttons }: HeroSectionProps) {
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
