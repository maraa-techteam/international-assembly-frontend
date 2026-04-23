import { Typography } from '@/ui'

type ServiceLabelProps = {
  text: string
}

export function ServiceLabel({ text }: ServiceLabelProps) {
  return (
    <Typography
      variant='caption'
      className='text-primary inline-flex rounded-full bg-white px-4 py-2'
    >
      {text}
    </Typography>
  )
}
