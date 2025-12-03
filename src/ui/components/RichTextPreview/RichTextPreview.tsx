import { cn } from '@/lib/utils/cn'
import sanitizeHtml from 'sanitize-html'

export function RichTextPreview({
  htmlContent,
  className,
}: {
  htmlContent: string
  className?: string
}) {
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
      'h1',
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
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  )
}
