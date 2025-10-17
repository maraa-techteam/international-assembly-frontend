import { ContentGuideSectionProps } from '@/types/Sections'
import ContentGuide from '@/ui/components/ContentGuide/ContentGuide'
import Section from '@/ui/components/Section/Section'
import Typography from '@/ui/components/Typography/Typography'
import { FC } from 'react'

const ContentGuideSection: FC<ContentGuideSectionProps> = ({ data, title }) => {
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
          <ContentGuide data={data} />
        </>
      }
    />
  )
}
export default ContentGuideSection
