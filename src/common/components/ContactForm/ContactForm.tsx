'use client'

import { Button, Icon, Loader, Typography } from '@/common/components'
import { cn } from '@/common/utils/cn'
import {
  isPdfFile,
  maxUploadFileSizeInBytes,
} from '@/common/utils/fileUploadValidation'
import { useId, useRef, useState } from 'react'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<FormState> & {
  file?: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

type ContactFormProps = {
  className?: string
  endpoint?: string
  includeSubject?: boolean
  includeFileUpload?: boolean
  presetSubject?: string
}

const inputClasses =
  'w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-base text-foreground placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors'

const labelClasses = 'sr-only'

const errorInputClasses =
  'border-red-500/20 focus:border-red-500/20 focus:ring-red-500/20'

export function ContactForm({
  className,
  endpoint = '/api/contact',
  includeSubject = true,
  includeFileUpload = false,
  presetSubject,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: presetSubject ?? '',
    message: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const idPrefix = useId()
  const nameInputId = `${idPrefix}-name`
  const emailInputId = `${idPrefix}-email`
  const subjectInputId = `${idPrefix}-subject`
  const messageInputId = `${idPrefix}-message`
  const fileInputId = `${idPrefix}-file`

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Введите ваше имя'
    if (!formData.email.trim()) {
      newErrors.email = 'Введите ваш e-mail'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный e-mail'
    }
    if (includeSubject && !formData.subject.trim()) {
      newErrors.subject = 'Введите тему'
    }
    if (!formData.message.trim()) newErrors.message = 'Введите сообщение'

    if (includeFileUpload) {
      if (!file) {
        newErrors.file = 'Добавьте PDF-файл'
      } else if (!isPdfFile(file)) {
        newErrors.file = 'Разрешены только PDF-файлы'
      } else if (file.size > maxUploadFileSizeInBytes) {
        newErrors.file = 'Размер файла не должен превышать 5 МБ'
      }
    }

    return newErrors
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)
    if (errors.file) {
      setErrors((prev) => ({ ...prev, file: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')

    try {
      let response: Response
      const subjectValue = formData.subject.trim()
      const presetOrEmpty = presetSubject || ''
      const resolvedSubject = includeSubject
        ? subjectValue || presetOrEmpty
        : presetOrEmpty

      if (includeFileUpload) {
        const payload = new FormData()
        payload.set('name', formData.name)
        payload.set('email', formData.email)
        payload.set('message', formData.message)

        if (resolvedSubject) {
          payload.set('subject', resolvedSubject)
        }

        if (file) {
          payload.set('file', file)
        }

        response = await fetch(endpoint, {
          method: 'POST',
          body: payload,
        })
      } else {
        const payload = includeSubject
          ? formData
          : { ...formData, subject: resolvedSubject }

        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: presetSubject ?? '',
          message: '',
        })
        setFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        setErrors({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        'bg-light-blue flex w-full flex-col gap-4 p-4',
        '-mx-4 w-[calc(100%+2rem)] rounded-none',
        'lg:mx-0 lg:w-full lg:rounded-[20px]',
        className,
      )}
    >
      <div className='flex flex-col gap-1'>
        <label className={labelClasses} htmlFor={nameInputId}>
          Ваше имя
        </label>
        <input
          id={nameInputId}
          type='text'
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder='Ваше имя'
          className={cn(inputClasses, errors.name && errorInputClasses)}
        />
        {errors.name && (
          <span className='text-sm text-red-400'>{errors.name}</span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label className={labelClasses} htmlFor={emailInputId}>
          Ваш e-mail
        </label>
        <input
          id={emailInputId}
          type='email'
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder='example@mail.com'
          className={cn(inputClasses, errors.email && errorInputClasses)}
        />
        {errors.email && (
          <span className='text-sm text-red-400'>{errors.email}</span>
        )}
      </div>

      {includeSubject && (
        <div className='flex flex-col gap-1'>
          <label className={labelClasses} htmlFor={subjectInputId}>
            Тема
          </label>
          <input
            id={subjectInputId}
            type='text'
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder='Тема сообщения'
            className={cn(inputClasses, errors.subject && errorInputClasses)}
          />
          {errors.subject && (
            <span className='text-sm text-red-400'>{errors.subject}</span>
          )}
        </div>
      )}

      <div className='flex flex-col gap-1'>
        <label className={labelClasses} htmlFor={messageInputId}>
          Сообщение
        </label>
        <textarea
          id={messageInputId}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder='Ваше сообщение'
          rows={5}
          className={cn(
            inputClasses,
            'resize-none',
            errors.message && errorInputClasses,
          )}
        />
        {errors.message && (
          <span className='text-sm text-red-400'>{errors.message}</span>
        )}
      </div>

      {includeFileUpload && (
        <div className='flex flex-col gap-1'>
          <label className={labelClasses} htmlFor={fileInputId}>
            PDF-файл
          </label>
          <div className='relative'>
            <input
              id={fileInputId}
              ref={fileInputRef}
              type='file'
              accept='application/pdf,.pdf'
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] ?? null
                handleFileChange(selectedFile)
              }}
              className='hidden'
            />
            <label
              htmlFor={fileInputId}
              className='inline-flex cursor-pointer items-center gap-2'
            >
              <Icon icon='add' className='text-primary' />
              <Typography className='text-primary' variant='caption'>
                Прикрепить документ
              </Typography>
            </label>
          </div>
          {errors.file && (
            <span className='text-sm text-red-400'>{errors.file}</span>
          )}
        </div>
      )}

      {status === 'success' && (
        <Typography variant='caption' className='text-green-700'>
          Сообщение успешно отправлено!
        </Typography>
      )}
      {status === 'error' && (
        <Typography variant='caption' className='text-red-400'>
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
          <Typography variant='caption' className='font-medium' font='roboto'>
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
