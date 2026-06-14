import { fetchLiteraturePage } from '@/common/api/fetchLiteraturePage'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'

import { fetchLiteratureItems } from '../api/fetchLiteratureItems'
import { LiteratureSection } from '../components/LiteratureSection/LiteratureSection'
import {
  groupLiteratureByType,
  literatureCategoryLabels,
  literatureItemTypes,
} from '../utils/literature.utils'

export async function LiteraturePage() {
  const pageData = await fetchLiteraturePage()
  const page = pageData[0]
  const items = await fetchLiteratureItems()
  const grouped = groupLiteratureByType(items)

  return (
    <>
      <Section className='max-w-200' color='white'>
        <Typography variant='h1'>{page?.title ?? 'Литература'}</Typography>
        <RichTextPreview htmlContent={page?.text ?? ''} />
      </Section>
      <Section color='white' className='gap-10 lg:pb-12'>
        {literatureItemTypes.map((type) => {
          const sectionItems = grouped[type]
          if (sectionItems.length === 0) return null
          return (
            <LiteratureSection
              key={type}
              type={type}
              label={literatureCategoryLabels[type]}
              items={sectionItems}
            />
          )
        })}
      </Section>
    </>
  )
}
