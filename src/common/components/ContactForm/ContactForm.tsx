'use client'

import { Button, Icon, Loader, Typography } from '@/common/components'
import { cn } from '@/common/utils/cn'
import { useState } from 'react'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const inputClasses =
  'w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-base text-foreground placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors'

const labelClasses = 'sr-only'

const errorInputClasses =
  'border-red-500 focus:border-red-500 focus:ring-red-500/20'

export function ContactForm({ className }: { className?: string }) {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const validate = (): Partial<FormState> => {
    const newErrors: Partial<FormState> = {}
    if (!formData.name.trim()) newErrors.name = 'Введите ваше имя'
    if (!formData.email.trim()) {
      newErrors.email = 'Введите ваш e-mail'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный e-mail'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Введите тему'
    if (!formData.message.trim()) newErrors.message = 'Введите сообщение'
    return newErrors
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
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
        <label className={labelClasses}>Ваше имя</label>
        <input
          type='text'
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder='Ваше имя'
          className={cn(inputClasses, errors.name && errorInputClasses)}
        />
        {errors.name && (
          <span className='text-sm text-red-500'>{errors.name}</span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label className={labelClasses}>Ваш e-mail</label>
        <input
          type='email'
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder='example@mail.com'
          className={cn(inputClasses, errors.email && errorInputClasses)}
        />
        {errors.email && (
          <span className='text-sm text-red-500'>{errors.email}</span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label className={labelClasses}>Тема</label>
        <input
          type='text'
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          placeholder='Тема сообщения'
          className={cn(inputClasses, errors.subject && errorInputClasses)}
        />
        {errors.subject && (
          <span className='text-sm text-red-500'>{errors.subject}</span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label className={labelClasses}>Сообщение</label>
        <textarea
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
          <span className='text-sm text-red-500'>{errors.message}</span>
        )}
      </div>

      {status === 'success' && (
        <Typography variant='caption' className='text-green-600'>
          Сообщение успешно отправлено!
        </Typography>
      )}
      {status === 'error' && (
        <Typography variant='caption' className='text-red-500'>
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
