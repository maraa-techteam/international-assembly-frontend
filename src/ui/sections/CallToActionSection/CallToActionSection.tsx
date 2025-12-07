import getImageUrl from '@/lib/utils/getImageUrl'
import { CallToActionSectionProps } from '@/types/sections'
import {
  Button,
  Grid,
  LinkComponent,
  RichTextPreview,
  Section,
  Typography,
} from '@/ui/components'
import Image from 'next/image'

export function CallToActionSection({
  title,
  headingVariant = 'h2',
  text,
  linkText,
  linkHref,
  linkIcon,
  actions,
  image,
}: CallToActionSectionProps) {
  return (
    <Section
      variant='double-column'
      color={'white'}
      leftColumn={
        <>
          <Typography variant={headingVariant} font='roboto'>
            {title}
          </Typography>
          <RichTextPreview htmlContent={text} />
          {linkText && linkHref && (
            <LinkComponent
              icon={linkIcon}
              isUnderlined
              color={'primary'}
              text={linkText}
              href={linkHref}
              variant={'icon-left'}
            />
          )}
          <Grid
            as={'nav'}
            justify={'center'}
            className={'lg:flex lg:flex-row'}
            align={'center'}
          >
            {actions.map((button, i) => (
              <Button
                key={i}
                variant={button.variant}
                size={button.size}
                color={button.color}
                as={button.as}
              >
                {button.label}
              </Button>
            ))}
          </Grid>
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
              className='w-full max-w-md rounded-lg object-contain object-top'
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
