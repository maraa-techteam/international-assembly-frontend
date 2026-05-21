import {
  type ContributionsProvider,
  fetchContributionsPage,
} from '@/common/api/fetchContributionsPage'
import { Button } from '@/common/components/Button/Button'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Typography } from '@/common/components/Typography/Typography'
import { Section } from '@/common/layouts/Section/Section'
import { Metadata } from 'next'

const pageData = await fetchContributionsPage()

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return {
    title: page.meta_title + ' | Международная Ассамблея АА',
    description: page.meta_description,
    alternates: {
      canonical: '/contributions',
    },
  }
}

export default async function Contributions() {
  const page = pageData[0]
  return (
    <>
      <Section alignment='start' className='lg:pb-12' color='white'>
        <Typography variant='h1'>{page.title}</Typography>
        <RichTextPreview htmlContent={page.text} />
        <div className='flex flex-col gap-4 lg:flex-row'>
          {page.provider.map((provider: ContributionsProvider) => (
            <div
              key={provider.id}
              className='bg-primary flex min-h-45 max-w-85 flex-col gap-2 rounded-lg p-4 lg:p-6'
            >
              <Typography variant='h3' className='text-white'>
                {provider.name}
              </Typography>
              {provider.description && (
                <Typography variant='body' className='text-white'>
                  {provider.description}
                </Typography>
              )}
              {provider.account && (
                <Typography variant='caption' className='text-white'>
                  {provider.account}
                </Typography>
              )}
              {provider.url && (
                <>
                  <a
                    href={provider.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-white underline'
                  >
                    {provider.url}
                  </a>
                  <Button
                    as='link'
                    href={provider.url}
                    variant='contained'
                    className='mt-2'
                    size={'lg'}
                    color={'white'}
                  >
                    Внести пожертвование
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
