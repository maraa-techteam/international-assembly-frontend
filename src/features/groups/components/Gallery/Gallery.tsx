'use client'

import { Icon, Typography } from '@/common/components'
import { useEscapeClose } from '@/common/hooks/useEscapeClose'
import { Grid } from '@/common/layouts'
import { getImageUrl } from '@/common/utils/getImageUrl'
import { ImageType } from '@/features/groups/components/Gallery/Gallery.type'
import Image from 'next/image'
import { useState } from 'react'

type GalleryPropstype = {
  images: ImageType[]
}

export function Gallery({ images }: GalleryPropstype) {
  const transformedImages = images.map((image) => ({
    id: image.id,
    src: image.directus_files_id,
  }))
  const [isImageOpen, setIsImageOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleImageClick = (imageId: string) => {
    const index = transformedImages.findIndex((img) => img.id === imageId)
    setCurrentIndex(index)
    setIsImageOpen(true)
  }

  const handleClose = () => {
    setIsImageOpen(false)
    setCurrentIndex(0)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? transformedImages.length - 1 : prev - 1,
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === transformedImages.length - 1 ? 0 : prev + 1,
    )
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      handleNext()
    }

    if (distance < -minSwipeDistance) {
      handlePrevious()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  useEscapeClose(handleClose)

  const selectedImage = transformedImages[currentIndex]

  return (
    <>
      <Grid className='grid-cols-2' as='ul' columns={4}>
        {transformedImages.map((image) => (
          <li key={image.id} role='listitem' className='relative'>
            <button
              onClick={() => handleImageClick(image.id)}
              className='absolute h-full w-full cursor-pointer'
            >
              <Typography variant='caption' className='sr-only'>
                Открыть изображение
              </Typography>
            </button>
            <Image
              width={188}
              height={130}
              src={getImageUrl(image.src)}
              alt={'Изображение'}
              className='w-full rounded-lg object-cover transition-opacity hover:opacity-80'
            />
          </li>
        ))}
      </Grid>
      {isImageOpen && (
        <div
          role='dialog'
          aria-modal='true'
          aria-label='Галерея изображений'
          className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900/90 px-4'
        >
          <button
            onClick={handleClose}
            className='absolute top-4 right-4 z-10 h-6 w-6 rounded-full bg-white/10 p-2 text-white opacity-75 transition-opacity hover:bg-white/20 hover:opacity-100'
            aria-label='Закрыть просмотр изображений'
          >
            <Icon className='absolute top-0 left-0' icon='close' />
          </button>

          <div
            className='flex items-center gap-6'
            role='group'
            aria-label='Навигация по изображениям'
          >
            {images.length > 1 && (
              <button
                onClick={handlePrevious}
                className='hidden h-10 w-10 rotate-180 items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors hover:bg-white md:flex'
                aria-label='Предыдущее изображение'
              >
                <Icon icon='chevron-right' />
              </button>
            )}

            <div
              className='relative max-w-lg'
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                width={868}
                height={600}
                src={getImageUrl(selectedImage?.src || '')}
                alt='Выбранное изображение'
                className='rounded-lg object-cover shadow-2xl'
              />
              <Typography
                variant='caption'
                className='sr-only'
                aria-live='polite'
                aria-atomic='true'
              >
                Изображение {currentIndex + 1} из {images.length}
              </Typography>
            </div>

            {images.length > 1 && (
              <button
                onClick={handleNext}
                className='hidden h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors hover:bg-white md:flex'
                aria-label='Следующее изображение'
              >
                <Icon icon='chevron-right' />
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div
              className='mt-6 flex gap-2 md:hidden'
              role='tablist'
              aria-label='Навигация по изображениям'
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-6 bg-white'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Перейти к изображению ${index + 1}`}
                  aria-selected={index === currentIndex}
                  role='tab'
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
