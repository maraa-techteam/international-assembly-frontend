import { FC } from 'react'

type LabelProps = {
  text: string
}

const Label: FC<LabelProps> = ({ text }) => {
  return (
    <span className='border-primary text-primary inline-flex w-fit cursor-pointer items-center justify-center rounded-full border bg-transparent px-6 py-2 font-mono text-nowrap transition-colors'>
      {text}
    </span>
  )
}

export default Label
