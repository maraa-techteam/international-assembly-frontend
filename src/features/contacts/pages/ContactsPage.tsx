import { fetchContactsPage } from '@/common/api/fetchContactsPage'
import { ContactForm } from '@/common/components/ContactForm/ContactForm'
import { RichTextPreview } from '@/common/components/RichTextPreview/RichTextPreview'
import { Section } from '@/common/components/Section/Section'
import { Typography } from '@/common/components/Typography/Typography'

export async function ContactsPage() {
  const page = await fetchContactsPage()

  return (
    <Section
      className='flex flex-col lg:grid lg:grid-cols-[minmax(0,800px)_minmax(300px,360px)]'
      alignment='start'
      color='white'
    >
      <div className='flex h-full w-full flex-col items-start justify-start gap-4 lg:gap-6'>
        <Typography variant='h1'>{page.title}</Typography>
        <RichTextPreview htmlContent={page.text} />
        <ContactForm />
      </div>
    </Section>
  )
}
