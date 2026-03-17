import { IsAaForMePage } from '@/features/quiz'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Подходит ли мне АА?',
  description:
    'Ответьте честно на 12 вопросов и узнайте, может ли Анонимные Алкоголики помочь вам.',
}

export default function Page() {
  return <IsAaForMePage />
}
