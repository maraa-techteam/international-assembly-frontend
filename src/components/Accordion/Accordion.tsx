import { AccordionItem as AccordionItemProps } from '@/types/components'

import { AccordionItem } from './AccordionItem'

export function Accordion({ items }: { items: AccordionItemProps[] }) {
  return (
    <div className='flex flex-col divide-y divide-[#D4DFEB]'>
      {items.map((item) => (
        <AccordionItem key={item.title} title={item.title} text={item.text} />
      ))}
    </div>
  )
}
