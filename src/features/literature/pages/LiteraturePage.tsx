import { fetchLiteraturePage } from '@/common/api/fetchLiteraturePage'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'

import { fetchLiteratureItemsByType } from '../api/fetchLiteratureItemsByType'
import { LiteratureSection } from '../components/LiteratureSection/LiteratureSection'
import {
  LiteratureCategorys,
  literatureCategoryLabels,
} from '../utils/literature.utils'

export async function LiteraturePage() {
  const [pageData, ...groups] = await Promise.all([
    fetchLiteraturePage(),
    ...LiteratureCategorys.map((type) => fetchLiteratureItemsByType(type)),
  ])

  const page = pageData[0]

  return (
    <>
      <Section className='max-w-200' color='white'>
        <Typography variant='h1'>{page?.title ?? 'Литература'}</Typography>
        <RichTextPreview htmlContent={page?.text ?? ''} />
      </Section>
      <Section color='white' className='gap-10 lg:pb-12'>
        {LiteratureCategorys.map((type, i) => {
          const { data: items } = groups[i]
          if (items.length === 0) return null
          return (
            <LiteratureSection
              key={type}
              type={type}
              label={literatureCategoryLabels[type]}
              items={items}
            />
          )
        })}
      </Section>
    </>
  )
}
