import { Accordion } from '@/common/components/Accordion/Accordion'
import { Button } from '@/common/components/Button/Button'
import { Grid } from '@/common/components/Grid/Grid'
import { Icon } from '@/common/components/Icon/Icon'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Section } from '@/common/components/Section/Section'
import Typography from '@/common/components/Typography/Typography'
import { getImageUrl } from '@/common/utils/getImageUrl'
import { isLaunchRoute } from '@/config/launchRoutes'
import Image from 'next/image'
import Link from 'next/link'

import { PageType } from './Page.type'

type PageProps = PageType
export default async function Page(page: PageProps) {
  // CTAs and the additional link are authored in the CMS and still point at
  // sections that are not part of the launch scope, so drop the ones that
  // would lead to a 404.
  const buttonLeft = page.button_left?.filter((button) =>
    isLaunchRoute(button.link),
  )
  const buttonRight = page.button_right?.filter((button) =>
    isLaunchRoute(button.link),
  )
  const additionalLink =
    page.additional_link && isLaunchRoute(page.additional_link.href)
      ? page.additional_link
      : undefined

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
          {additionalLink && (
            <Link
              href={additionalLink.href}
              className='text-primary flex flex-row items-center gap-4 underline'
            >
              {additionalLink.icon && <Icon icon={additionalLink.icon} />}
              {additionalLink.text}
            </Link>
          )}
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
