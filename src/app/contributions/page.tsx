import {
  fetchContributionsPage,
  type ContributionsProvider,
} from '@/common/api/fetchContributionsPage'
import { RichTextPreview, Section, Typography } from '@/ui'
import { Metadata } from 'next'

const pageData = await fetchContributionsPage()

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return {
    title: page.meta_title,
    description: page.meta_description,
  }
}

export default async function Contributions() {
  const page = pageData[0]

  return (
    <>
      <Section alignment='start' color='white'>
        <Typography variant='h1'>{page.title}</Typography>
        <RichTextPreview htmlContent={page.text} />
        <div className='flex flex-col gap-4 lg:flex-row'>
          {page.provider.map((provider: ContributionsProvider) => (
            <div
              key={provider.id}
              className='flex flex-col gap-2 rounded-lg bg-primary p-4 lg:p-6'
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
                <a
                  href={provider.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white underline'
                >
                  {provider.url}
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
