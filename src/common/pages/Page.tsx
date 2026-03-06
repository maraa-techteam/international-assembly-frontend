import {
  Accordion,
  Button,
  LinkComponent,
  RichTextPreview,
  Typography,
} from '@/common/components'
import { Grid, Section } from '@/common/layouts'
import { getImageUrl } from '@/common/utils/getImageUrl'
import Image from 'next/image'

import { PageType } from './Page.type'

type PageProps = PageType
export default async function Page(page: PageProps) {
  return (
    <>
      <Section
        className='flex flex-col lg:grid lg:grid-cols-[1fr_0.5fr]'
        alignment='start'
        color='white'
      >
        <div className='flex h-full w-full flex-col items-start justify-start gap-4 lg:gap-6'>
          <Typography variant='h1'>{page.title}</Typography>
          <RichTextPreview htmlContent={page.text} />
          {page.additional_link && (
            <LinkComponent
              icon={page.additional_link.icon}
              isUnderlined
              color='primary'
              text={page.additional_link.text}
              href={page.additional_link.href}
              variant='icon-left'
            />
          )}
          <Grid as='nav' className='lg:flex lg:flex-row'>
            {page.button_left && (
              <Button
                variant='outlined'
                size='lg'
                color='primary'
                as='link'
                href={page.button_left[0].link}
              >
                {page.button_left[0].label}
              </Button>
            )}
            {page.button_right && (
              <Button
                variant='contained'
                size='lg'
                color='primary'
                as='link'
                href={page.button_right[0].link}
              >
                {page.button_right[0].label}
              </Button>
            )}
          </Grid>
        </div>
        <div className='flex h-fit w-full lg:w-auto'>
          {page.image ? (
            <Image
              src={getImageUrl(page.image)}
              alt={page.title}
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
        </div>
      </Section>
      {page.rich_text && (
        <Section className='pt-0 lg:pt-0' color='white'>
          <RichTextPreview htmlContent={page.rich_text} />
        </Section>
      )}
      {page.faq && (
        <Section className='pt-0 lg:pt-0' color='white'>
          <Accordion items={page.faq} />
        </Section>
      )}
    </>
  )
}
