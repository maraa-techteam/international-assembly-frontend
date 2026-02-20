import { cn } from '@/common/utils/cn'
import { type VariantProps, cva } from 'class-variance-authority'

import { IconType } from './Icon.type'

const icons = {
  'arrow-right': (
    <>
      <path
        fill='currentColor'
        d='M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z'
      />
    </>
  ),

  'chevron-down': (
    <>
      <path
        fill='currentColor'
        d='M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z'
      />
    </>
  ),

  'chevron-right': (
    <>
      <path
        fill='currentColor'
        d='M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z'
      />
    </>
  ),

  'double-chevron-right': (
    <>
      <path
        fill='currentColor'
        d='M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z'
      />
    </>
  ),

  search: (
    <>
      <path
        fill='currentColor'
        d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z'
      />
    </>
  ),

  close: (
    <>
      <path
        fill='currentColor'
        d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'
      />
    </>
  ),

  hamburger: (
    <>
      <path
        fill='currentColor'
        d='M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z'
      />
    </>
  ),

  'arrow-left': (
    <>
      <path
        fill='currentColor'
        d='M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z'
      />
    </>
  ),

  youtube: (
    <>
      <path
        transform='translate(0, -960) scale(40)'
        d='M14.0037 11.7913L11.1963 10.4813C10.9513 10.3675 10.75 10.495 10.75 10.7662V13.2338C10.75 13.505 10.9513 13.6325 11.1963 13.5188L14.0025 12.2087C14.2488 12.0938 14.2487 11.9063 14.0037 11.7913ZM12 0C5.3725 0 0 5.3725 0 12C0 18.6275 5.3725 24 12 24C18.6275 24 24 18.6275 24 12C24 5.3725 18.6275 0 12 0ZM12 16.875C5.8575 16.875 5.75 16.3213 5.75 12C5.75 7.67875 5.8575 7.125 12 7.125C18.1425 7.125 18.25 7.67875 18.25 12C18.25 16.3213 18.1425 16.875 12 16.875Z'
        fill='currentColor'
      />
    </>
  ),

  telegram: (
    <>
      <path
        transform='translate(0, -960) scale(48)'
        d='M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.64 6.8C14.49 8.38 13.84 12.22 13.51 13.99C13.37 14.74 13.09 14.99 12.83 15.02C12.25 15.07 11.81 14.64 11.25 14.27C10.37 13.69 9.87 13.33 9.02 12.77C8.03 12.12 8.67 11.76 9.24 11.18C9.39 11.03 11.95 8.7 12 8.49C12.0069 8.45819 12.006 8.42517 11.9973 8.3938C11.9886 8.36244 11.9724 8.33367 11.95 8.31C11.89 8.26 11.81 8.28 11.74 8.29C11.65 8.31 10.25 9.24 7.52 11.08C7.12 11.35 6.76 11.49 6.44 11.48C6.08 11.47 5.4 11.28 4.89 11.11C4.26 10.91 3.77 10.8 3.81 10.45C3.83 10.27 4.08 10.09 4.55 9.9C7.47 8.63 9.41 7.79 10.38 7.39C13.16 6.23 13.73 6.03 14.11 6.03C14.19 6.03 14.38 6.05 14.5 6.15C14.6 6.23 14.63 6.34 14.64 6.42C14.63 6.48 14.65 6.66 14.64 6.8Z'
        fill='currentColor'
      />
    </>
  ),

  check: (
    <>
      <path
        fill='currentColor'
        d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'
      />
    </>
  ),

  person: (
    <>
      <path
        fill='currentColor'
        d='M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z'
      />
    </>
  ),

  phone: (
    <>
      <path
        fill='currentColor'
        d='M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z'
      />
    </>
  ),

  website: (
    <>
      <path
        fill='currentColor'
        d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z'
      />
    </>
  ),
}

const iconVariants = cva('inline-flex flex-shrink-0', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    },
    color: {
      white: 'text-white',
      primary: 'text-primary',
      secondary: 'text-secondary',
      foreground: 'text-foreground',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type IconVariantProps = VariantProps<typeof iconVariants>

type IconPropsType = {
  icon: IconType
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Icon({ icon, size = 'md', className }: IconPropsType) {
  return (
    <svg
      data-testid='icon'
      aria-hidden='true'
      viewBox='0 -960 960 960'
      className={cn(iconVariants({ size }), className)}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {icons[icon]}
    </svg>
  )
}
