import { Typography } from '@/common/components'
import { Grid } from '@/common/layouts/Grid/Grid'

import { LiteratureItem } from '../../types/LiteratureItem.type'
import { LiteratureCard } from '../LiteratureCard/LiteratureCard'

type LiteratureSectionProps = {
  label: string
  items: LiteratureItem[]
}

export function LiteratureSection({ label, items }: LiteratureSectionProps) {
  return (
    <div className='flex flex-col gap-4'>
      <Typography variant='h2' font='roboto'>
        {label}
      </Typography>
      <Grid columns={4} gap={4} isScrollable={false}>
        {items.map((item) => (
          <LiteratureCard key={item.id} {...item} />
        ))}
      </Grid>
    </div>
  )
}
