import { ContentGuideSectionProps } from '@/types/sections'
import { Section } from '@/ui/components'
import { ContentGuide } from '@/ui/components'
import Typography from '@/ui/components/Typography/Typography'

export function ContentGuideSection({ data, title }: ContentGuideSectionProps) {
  return (
    <Section
      variant='double-column'
      color={'primary'}
      className='items-start overflow-x-hidden'
      leftColumn={
        <>
          <Typography variant={'h2'} font={'mono'}>
            {title}
          </Typography>
          {!!data.length && <ContentGuide data={data} />}
        </>
      }
    />
  )
}
