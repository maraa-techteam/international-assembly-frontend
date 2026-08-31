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
  const {
    button_left: buttonLeft,
    button_right: buttonRight,
    additional_link: additionalLink,
  } = page

  return (
    <>
      <Section
        // The two columns cap out at 800px and 360px, which leaves slack on a
        // wide viewport. `justify-between` hands that slack to the gutter
        // between them so the illustration stays flush with the right margin
        // instead of stopping short of it. Only from `lg` up: below that the
        // section is a flex column, where it would spread the stack vertically.
        className='flex flex-col lg:grid lg:grid-cols-[minmax(0,800px)_minmax(300px,360px)] lg:justify-between'
        alignment='start'
        color='white'
      >
        <div className='flex h-full w-full flex-col items-start justify-start gap-4 lg:gap-6'>
          <Typography variant='h1'>{page.title}</Typography>
          <RichTextPreview htmlContent={page.text} />
          {additionalLink && (
            <Link
              href={additionalLink.href}
              className='text-primary flex flex-row items-center gap-4 underline'
            >
              {additionalLink.icon && <Icon icon={additionalLink.icon} />}
              {additionalLink.text}
            </Link>
          )}
          {!!buttonLeft?.length && !!buttonRight?.length && (
            <Grid as='nav' className='lg:flex lg:flex-row'>
              {!!buttonLeft?.length && (
                <Button
                  variant='outlined'
                  size='lg'
                  color='primary'
                  as='link'
                  href={buttonLeft[0].link}
                >
                  {buttonLeft[0].label}
                </Button>
              )}
              {!!buttonRight?.length && (
                <Button
                  variant='contained'
                  size='lg'
                  color='primary'
                  as='link'
                  href={buttonRight[0].link}
                >
                  {buttonRight[0].label}
                </Button>
              )}
            </Grid>
          )}
        </div>
        {/* Rendered at the file's own dimensions rather than a fixed box: the
            illustrations range from 4:3 to 16:9, so any single box would either
            letterbox or crop them. `h-auto` lets the height follow the width,
            and the real ratio reserves the correct space up front. */}
        {page.image?.width && page.image?.height && (
          <div className='h-fit w-full'>
            <Image
              src={getImageUrl(page.image.id)}
              alt={page.title}
              width={page.image.width}
              height={page.image.height}
              sizes='(min-width: 1024px) 360px, 100vw'
              className='h-auto w-full rounded-lg'
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
