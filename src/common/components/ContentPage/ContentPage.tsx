import { Section } from '@/common/components/Section/Section'
import Image from 'next/image'
import { ReactNode } from 'react'

type ContentIntroProps = {
  children: ReactNode
  image?: {
    src: string
    alt: string
    width: number
    height: number
  }
}

/**
 * The opening section of a content page: the page's copy and, when it has one,
 * an illustration beside it. Layout only — the page writes its own copy.
 */
export function ContentIntro({ children, image }: ContentIntroProps) {
  return (
    <Section
      // The two columns cap out at 800px and 360px, which leaves slack on a
      // wide viewport. `justify-between` hands that slack to the gutter
      // between them so the illustration stays flush with the right margin
      // instead of stopping short of it. Only from `lg` up: below that the
      // section is a flex column, where it would spread the stack vertically.
      className='flex flex-col lg:grid lg:grid-cols-[minmax(0,800px)_minmax(300px,360px)] lg:justify-between'
      alignment='start'
      color='white'
    >
      <div className='flex h-full w-full flex-col items-start justify-start gap-4 lg:gap-6'>
        {children}
      </div>
      {/* Rendered at the file's own dimensions rather than a fixed box: the
          illustrations range from 4:3 to 16:9, so any single box would either
          letterbox or crop them. `h-auto` lets the height follow the width,
          and the real ratio reserves the correct space up front. */}
      {image && (
        <div className='h-fit w-full'>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes='(min-width: 1024px) 360px, 100vw'
            className='h-auto w-full rounded-lg'
            priority={false}
          />
        </div>
      )}
    </Section>
  )
}

/** The section below `ContentIntro`, holding a page's long text or its FAQ. */
export function ContentBody({ children }: { children: ReactNode }) {
  return (
    <Section
      className='pt-0 pb-12 lg:grid lg:grid-cols-[minmax(0,800px)_minmax(300px,360px)] lg:pt-0 lg:pb-24'
      color='white'
    >
      {children}
    </Section>
  )
}
