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
        className='flex flex-col lg:grid lg:grid-cols-[minmax(0,800px)_minmax(300px,360px)]'
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
            {page.button_left?.length && (
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
            {page.button_right?.length && (
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
        {page.image && (
          <div className='flex h-fit w-full justify-end'>
            <Image
              src={getImageUrl(page.image, { width: 400, height: 250 })}
              alt={page.title}
              width={400}
              height={250}
              sizes='(max-width: 640px) 100vw, 600px'
              className='w-full rounded-lg object-contain object-top'
              priority={false}
            />
          </div>
        )}
      </Section>

      <Section
        className='pt-0 pr-0 lg:grid lg:grid-cols-[minmax(0,800px)_minmax(300px,360px)] lg:pt-0'
        color='white'
      >
        {page.rich_text && <RichTextPreview htmlContent={page.rich_text} />}

        {page.faq && <Accordion items={page.faq} />}
      </Section>
    </>
  )
}
