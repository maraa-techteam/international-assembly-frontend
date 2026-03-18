import { fetchContactsPage } from '@/common/api/fetchContactsPage'
import { ContactForm } from '@/features/contacts/components/ContactForm/ContactForm'
import { RichTextPreview, Section, Typography } from '@/ui'
import { Metadata } from 'next'

const pageData = await fetchContactsPage()

export async function generateMetadata(): Promise<Metadata> {
  const page = pageData[0]

  return {
    title: page.meta_title,
    description: page.meta_description,
  }
}

export default async function Contacts() {
  const page = pageData[0]
  return (
    <>
      <Section className='flex flex-col' alignment='start' color='white'>
        <div className='flex h-full w-full flex-col items-start justify-start gap-4 lg:gap-6'>
          <Typography variant='h1'>{page.title}</Typography>
          <RichTextPreview htmlContent={page.text} />
        </div>
        <ContactForm />
      </Section>
    </>
  )
}
