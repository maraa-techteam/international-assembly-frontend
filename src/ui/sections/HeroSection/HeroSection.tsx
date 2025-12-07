import { HeroSectionProps } from '@/types/sections'
import { Button, Grid, Section } from '@/ui/components'
import Typography from '@/ui/components/Typography/Typography'

export function HeroSection({ title, actions }: HeroSectionProps) {
  return (
    <Section
      variant='single-column'
      color={'white'}
      className='gap-8 py-10 text-center lg:gap-15 lg:py-39'
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
        {actions.map((action, i) => (
          <Button
            key={i}
            variant={action.variant}
            size={action.size}
            color={action.color}
            as={action.as}
          >
            {action.label}
          </Button>
        ))}
      </Grid>
    </Section>
  )
}
