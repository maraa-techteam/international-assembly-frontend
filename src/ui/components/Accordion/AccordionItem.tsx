import { AccordionItem as AccordionItemType } from '@/types/components'
import { RichTextPreview, Typography } from '@/ui/components'

export function AccordionItem({ title, text }: AccordionItemType) {
  return (
    <details className='group flex flex-col'>
      <summary className='flex w-full cursor-pointer flex-row items-center justify-between py-6'>
        <Typography variant={'h3'} font={'roboto'}>
          {title}
        </Typography>
        <div className='bg-primary group-open:border-primary relative h-7.5 w-7.5 rounded-full group-open:border-1 group-open:bg-transparent'>
          <div className='group-open:bg-primary absolute bottom-1/2 left-1/2 h-0.5 w-5 -translate-x-1/2 translate-y-1/2 transform rounded-xl bg-white'></div>
          <div className='absolute bottom-1/2 left-1/2 h-5 w-0.5 -translate-x-1/2 translate-y-1/2 transform rounded-xl bg-white group-open:hidden'></div>
        </div>
      </summary>
      <RichTextPreview htmlContent={text} />
    </details>
  )
}
