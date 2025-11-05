import getImageUrl from '@/lib/utils/getImageUrl'
import { CallToActionSectionProps } from '@/types/Sections'
import ButtonGroup from '@/ui/components/ButtonGroup/ButtonGroup'
import LinkComponent from '@/ui/components/LinkComponent/LinkComponent'
import Section from '@/ui/components/Section/Section'
import Typography from '@/ui/components/Typography/Typography'
import Image from 'next/image'
import { FC } from 'react'

const CallToActionSection: FC<CallToActionSectionProps> = ({
  title,
  text,
  linkText,
  linkHref,
  linkIcon,
  actions,
  image,
}) => {
  return (
    <Section
      variant='double-column'
      color={'white'}
      leftColumn={
        <>
          <Typography variant='h2' font='mono'>
            {title}
          </Typography>
          <Typography variant='body' font='mono'>
            {text}
          </Typography>
          <LinkComponent
            icon={linkIcon}
            isUnderlined
            color='text-primary'
            text={linkText}
            href={linkHref}
            variant={'icon-left'}
          />
          <ButtonGroup
            orientation='horizontal'
            alignment='end'
            buttons={actions}
          />
        </>
      }
      rightColumn={
        <>
          {image ? (
            <Image
              src={getImageUrl(image)}
              alt={title}
              width={500}
              height={400}
              sizes='(max-width: 640px) 100vw, 600px'
              className='w-full max-w-md rounded-lg object-cover'
              priority={false}
            />
          ) : (
            <div className='flex h-64 w-full items-center justify-center rounded-lg bg-[#f5f5f5]'>
              <span className='text-sm text-gray-400'>Картинка не найдена</span>
            </div>
          )}
        </>
      }
    />
  )
}

export default CallToActionSection
