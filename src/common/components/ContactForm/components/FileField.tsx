import { Icon } from '@/common/components/Icon/Icon'
import { Typography } from '@/common/components/Typography/Typography'
import type { RefObject } from 'react'

type Props = {
  id: string
  fileInputRef: RefObject<HTMLInputElement | null>
  onChange: (file: File | null) => void
  error?: string
}

export function FileField({ id, fileInputRef, onChange, error }: Props) {
  return (
    <div className='flex flex-col gap-1'>
      <label className='sr-only' htmlFor={id}>
        PDF-файл
      </label>
      <div className='relative'>
        <input
          id={id}
          ref={fileInputRef}
          type='file'
          accept='application/pdf,.pdf'
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className='hidden'
        />
        <label
          htmlFor={id}
          className='inline-flex cursor-pointer items-center gap-2'
        >
          <Icon icon='add' className='text-primary' />
          <Typography className='text-primary' variant='body'>
            Прикрепить документ
          </Typography>
        </label>
      </div>
      {error && <span className='text-sm text-red-400'>{error}</span>}
    </div>
  )
}
