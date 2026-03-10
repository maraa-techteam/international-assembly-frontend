import { AccordionType } from './Accordion.type'
import { AccordionItem } from './components/AccordionItem'

export type AccordionProps = AccordionType[]

export function Accordion({ items }: { items: AccordionProps }) {
  return (
    <div className='flex flex-col divide-y divide-[#D4DFEB]'>
      {items.map((item) => (
        <AccordionItem key={item.title} title={item.title} text={item.text} />
      ))}
    </div>
  )
}
