import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'
import Image from 'next/image'

/** Stands in for a section whose content is not ready to publish yet. */
export function WorkInProgress() {
  return (
    <Section
      color='white'
      alignment='center'
      className='mx-auto items-center gap-6 py-20 text-center lg:py-32'
    >
      <Image
        src='/images/hammer.svg'
        alt=''
        aria-hidden
        width={160}
        height={160}
        className='h-40 w-40'
      />
      <Typography variant='h1'>Раздел в разработке</Typography>
      <Typography variant='body'>
        Мы готовим материалы для этого раздела. Пожалуйста, загляните позже.
      </Typography>
    </Section>
  )
}
