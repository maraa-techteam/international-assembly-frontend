import { HeroSectionProps } from '@/types/sections'
import { Button, Grid, Section } from '@/ui/components'
import Typography from '@/ui/components/Typography/Typography'

export function HeroSection({ title, buttons }: HeroSectionProps) {
  return (
    <Section
      variant='single-column'
      color={'white'}
      className='gap-8 text-center lg:gap-15 lg:py-39'
    >
      <Typography variant={'h1'} className='lg:text-5xl' font={'roboto'}>
        {title}
      </Typography>
      <Grid
        as={'nav'}
        justify={'center'}
        className={'lg:flex lg:flex-row'}
        align={'center'}
      >
        {buttons.map((button, i) => (
          <Button
            key={i}
            variant={button.variant}
            size={button.size}
            color={button.color}
            as={button.as}
          >
            {button.label}
          </Button>
        ))}
      </Grid>
    </Section>
  )
}
