'use client'

import { Button } from '@/common/components/Button/Button'
import { ConsentField } from '@/common/components/ContactForm/components/ConsentField'
import { Field } from '@/common/components/ContactForm/components/Field'
import { FileField } from '@/common/components/ContactForm/components/FileField'
import { submitContactForm } from '@/common/components/ContactForm/contactFormApi'
import { Icon } from '@/common/components/Icon/Icon'
import { Loader } from '@/common/components/Loader/Loader'
import { Typography } from '@/common/components/Typography/Typography'
import { cn } from '@/common/utils/cn'
import {
  isPdfFile,
  maxUploadFileSizeInBytes,
} from '@/common/utils/fileUploadValidation'
import { TELEGRAM_HELP_URL } from '@/config/site'
import { useId, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
  /** Art. 9(2)(a) explicit consent. See `ConsentField` for why it is required. */
  consent: boolean
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

type ContactFormProps = {
  className?: string
  endpoint?: string
  includeSubject?: boolean
  includeFileUpload?: boolean
  presetSubject?: string
}

export function ContactForm({
  className,
  endpoint = '/api/contact',
  includeSubject = true,
  includeFileUpload = false,
  presetSubject,
}: ContactFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | undefined>()
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const idPrefix = useId()
  const nameInputId = `${idPrefix}-name`
  const emailInputId = `${idPrefix}-email`
  const subjectInputId = `${idPrefix}-subject`
  const messageInputId = `${idPrefix}-message`
  const fileInputId = `${idPrefix}-file`
  const consentInputId = `${idPrefix}-consent`

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      subject: presetSubject ?? '',
      message: '',
      consent: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    if (includeFileUpload) {
      if (!file) {
        setFileError('Добавьте PDF-файл')
        return
      }
      if (!isPdfFile(file)) {
        setFileError('Разрешены только PDF-файлы')
        return
      }
      if (file.size > maxUploadFileSizeInBytes) {
        setFileError('Размер файла не должен превышать 5 МБ')
        return
      }
    }

    setStatus('loading')

    const resolvedSubject = includeSubject
      ? data.subject.trim() || (presetSubject ?? '')
      : (presetSubject ?? '')

    try {
      const ok = await submitContactForm({
        endpoint,
        payload: { ...data, subject: resolvedSubject },
        file: includeFileUpload ? file : null,
      })

      if (ok) {
        setStatus('success')
        reset({
          name: '',
          email: '',
          subject: presetSubject ?? '',
          message: '',
          consent: false,
        })
        setFile(null)
        setFileError(undefined)
        if (fileInputRef.current) fileInputRef.current.value = ''
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        'bg-light-blue flex w-full flex-col gap-4 p-4',
        '-mx-4 w-[calc(100%+2rem)] rounded-none',
        'lg:mx-0 lg:w-full lg:rounded-[20px]',
        className,
      )}
    >
      <Field
        id={nameInputId}
        variant='name'
        registration={register('name', {
          required: 'Введите имя или псевдоним',
        })}
        error={errors.name?.message}
      />

      <Field
        id={emailInputId}
        variant='email'
        registration={register('email', {
          required: 'Введите ваш e-mail',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Введите корректный e-mail',
          },
        })}
        error={errors.email?.message}
      />

      {includeSubject && (
        <Field
          id={subjectInputId}
          variant='subject'
          registration={register('subject', { required: 'Введите тему' })}
          error={errors.subject?.message}
        />
      )}

      <Field
        id={messageInputId}
        variant='message'
        registration={register('message', { required: 'Введите сообщение' })}
        error={errors.message?.message}
      />

      <Typography variant='body' className='text-sm'>
        Пожалуйста, не описывайте здесь состояние здоровья или употребление
        алкоголя — письмо попадает в обычный почтовый ящик. Если вам нужна
        помощь, напишите в анонимный чат-бот{' '}
        <a
          href={TELEGRAM_HELP_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary hover:text-secondary underline'
        >
          @QSAAbot
        </a>
        .
      </Typography>

      {includeFileUpload && (
        <FileField
          id={fileInputId}
          fileInputRef={fileInputRef}
          onChange={(f) => {
            setFile(f)
            setFileError(undefined)
          }}
          error={fileError}
        />
      )}

      <ConsentField
        id={consentInputId}
        registration={register('consent', {
          required: 'Без согласия мы не можем обработать обращение',
        })}
        error={errors.consent?.message}
      />

      {status === 'success' && (
        <Typography variant='body' className='text-green-700'>
          Сообщение успешно отправлено!
        </Typography>
      )}
      {status === 'error' && (
        <Typography variant='body' className='text-red-400'>
          Произошла ошибка. Попробуйте ещё раз.
        </Typography>
      )}

      <div className='flex w-full justify-end'>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className='group w-full gap-3 lg:max-w-75'
          size='sm'
          disabled={status === 'loading'}
        >
          <Typography variant='body' className='font-medium'>
            Отправить
          </Typography>
          {status === 'loading' ? (
            <Loader />
          ) : (
            <Icon
              icon='arrow-right'
              className='transition-transform duration-300 ease-in-out group-hover:translate-x-1'
              size='md'
            />
          )}
        </Button>
      </div>
    </form>
  )
}
