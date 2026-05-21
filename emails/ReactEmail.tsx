import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email'

type ReactEmailProps = {
  name: string
  email: string
  subject: string
  message: string
  previewText?: string
}

export const ReactEmail = ({
  name,
  email,
  subject,
  message,
  previewText,
}: ReactEmailProps) => {
  const date = new Date()
  return (
    <Html>
      <Head />
      <Preview>{previewText ?? subject}</Preview>
      <Tailwind>
        <Body className='bg-gray-100 font-sans'>
          <Container className='mx-auto max-w-[640px] bg-white'>
            {/* Header Section */}
            <Section className='bg-[#004382] px-8 py-10 text-right'>
              <Text className='m-0 mt-2 mb-2 text-center text-xl font-bold tracking-wide text-white'>
                Секретариат Международной Ассамблеи по Общему Обслуживанию
                Русскоязычных Анонимных Алкоголиков
              </Text>
            </Section>

            {/* Main Content Section */}
            <Section className='bg-white px-8 py-10'>
              <Text className='m-0 mb-2 text-sm text-gray-600'>
                <strong>От:</strong> {name} (
                <Link href={`mailto:${email}`} className='text-blue-600'>
                  {email}
                </Link>
                )
              </Text>
              <Text className='m-0 mb-2 text-sm text-gray-600'>
                <strong>Тема:</strong> {subject}
              </Text>
              <Text className='m-0 mb-2 text-sm font-semibold text-gray-600'>
                Сообщение:
              </Text>
              <Text className='m-0 text-sm leading-relaxed whitespace-pre-wrap text-gray-600'>
                {message}
              </Text>
            </Section>

            {/* Footer Section */}
            <Section className='bg-[#004382] px-8 py-8 text-center'>
              <Text className='m-0 text-xs text-white/80'>
                {`© ${date.getFullYear()} Международная Ассамблея по Общему Обслуживанию Русскоязычных Анонимных Алкоголиков`}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ReactEmail
