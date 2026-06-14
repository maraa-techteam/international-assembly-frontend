import { Accordion } from '@/common/components/Accordion/Accordion'
import { Button } from '@/common/components/Button/Button'
import { Grid } from '@/common/components/Grid/Grid'
import { Icon } from '@/common/components/Icon/Icon'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Section } from '@/common/components/Section/Section'
import Typography from '@/common/components/Typography/Typography'
import { getImageUrl } from '@/common/utils/getImageUrl'
import Image from 'next/image'
import Link from 'next/link'

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
            <Link
              href={page.additional_link.href}
              className='text-primary flex flex-row items-center gap-4 underline'
            >
              {page.additional_link.icon && (
                <Icon icon={page.additional_link.icon} />
              )}
              {page.additional_link.text}
            </Link>
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
        className='pt-0 pb-12 lg:grid lg:grid-cols-[minmax(0,800px)_minmax(300px,360px)] lg:pt-0 lg:pb-24'
        color='white'
      >
        {page.rich_text && <RichTextPreview htmlContent={page.rich_text} />}

        {page.faq && <Accordion items={page.faq} />}
      </Section>
    </>
  )
}
