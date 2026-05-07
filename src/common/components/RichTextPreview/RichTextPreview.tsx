import { cn } from '@/common/utils/cn'
import { enrichLinksWithIcons } from '@/common/utils/enrichLinksWithIcons'
import sanitizeHtml from 'sanitize-html'

import { RichTextPreviewType } from './RichTextPreview.type'

type RichTextPreviewPropsType = RichTextPreviewType & { className?: string }
export function RichTextPreview({
  htmlContent,
  className,
}: RichTextPreviewPropsType) {
  const cleanHtml = sanitizeHtml(htmlContent, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'p',
      'br',
      'span',
      'a',
      'ul',
      'ol',
      'li',
      'strong',
      'em',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class'],
    },
  })

  return (
    <div
      className={cn('rte', className)}
      dangerouslySetInnerHTML={{ __html: enrichLinksWithIcons(cleanHtml) }}
    />
  )
}
