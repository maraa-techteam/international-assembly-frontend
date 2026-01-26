import { cn } from '@/lib/utils/cn'
import { IconProps } from '@/types/components'
import { type VariantProps, cva } from 'class-variance-authority'

const iconVariants = cva(
  'inline-flex flex-shrink-0 items-center justify-center',
  {
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
        contrast: 'text-contrast',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'contrast',
    },
  },
)

export type IconVariantProps = VariantProps<typeof iconVariants>

export function Icon({
  icon,
  size = 'md',
  color = 'contrast',
  className,
}: IconProps) {
  const icons = {
    'arrow-right': (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='14'
        viewBox='0 0 18 14'
        fill='none'
      >
        <path
          d='M1 7L17 7M17 7L11 13M17 7L11 1'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    'chevron-down': (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='14'
        height='8'
        viewBox='0 0 14 8'
        fill='none'
      >
        <path
          d='M1 0.999999L7 7L13 1'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    'chevron-right': (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='8'
        height='14'
        viewBox='0 0 8 14'
        fill='none'
      >
        <path
          d='M1 13L7 7L1 1'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    'double-chevron-right': (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
      >
        <path
          d='M1 13L7 7L1 1'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7 13L13 7L7 1'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    search: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='18'
        viewBox='0 0 18 18'
      >
        <path
          d='M7.53 15.06C6.04071 15.06 4.58486 14.6184 3.34656 13.791C2.10826 12.9636 1.14312 11.7875 0.57319 10.4116C0.00326258 9.03568 -0.145856 7.52165 0.14469 6.06097C0.435237 4.6003 1.1524 3.25858 2.20549 2.20549C3.25858 1.1524 4.6003 0.435237 6.06097 0.14469C7.52165 -0.145856 9.03568 0.00326258 10.4116 0.57319C11.7875 1.14312 12.9636 2.10826 13.791 3.34656C14.6184 4.58486 15.06 6.04071 15.06 7.53C15.06 8.51886 14.8652 9.49803 14.4868 10.4116C14.1084 11.3252 13.5537 12.1553 12.8545 12.8545C12.1553 13.5537 11.3252 14.1084 10.4116 14.4868C9.49803 14.8652 8.51886 15.06 7.53 15.06ZM7.53 1.51C6.34332 1.51 5.18328 1.8619 4.19658 2.52119C3.20989 3.18047 2.44085 4.11755 1.98673 5.2139C1.5326 6.31026 1.41378 7.51666 1.64529 8.68054C1.8768 9.84443 2.44825 10.9135 3.28736 11.7526C4.12648 12.5918 5.19557 13.1632 6.35946 13.3947C7.52335 13.6262 8.72975 13.5074 9.8261 13.0533C10.9225 12.5992 11.8595 11.8301 12.5188 10.8434C13.1781 9.85673 13.53 8.69669 13.53 7.51C13.53 5.9187 12.8979 4.39258 11.7726 3.26736C10.6474 2.14214 9.1213 1.51 7.53 1.51Z M16.76 17.51C16.6614 17.5104 16.5638 17.4912 16.4728 17.4534C16.3818 17.4157 16.2992 17.3601 16.23 17.29L12.1 13.16C11.9675 13.0178 11.8954 12.8298 11.8988 12.6355C11.9022 12.4411 11.9809 12.2558 12.1184 12.1184C12.2558 11.9809 12.4411 11.9022 12.6355 11.8988C12.8298 11.8954 13.0178 11.9675 13.16 12.1L17.29 16.23C17.4304 16.3706 17.5093 16.5612 17.5093 16.76C17.5093 16.9587 17.4304 17.1493 17.29 17.29C17.2207 17.3601 17.1382 17.4157 17.0472 17.4534C16.9562 17.4912 16.8585 17.5104 16.76 17.51Z'
          fill='currentColor'
        />
      </svg>
    ),
    close: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='12'
        height='12'
        viewBox='0 0 12 12'
        fill='none'
      >
        <path
          d='M1 1L11 11M1 11L11 1'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    hamburger: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='16'
        viewBox='0 0 20 16'
        fill='none'
      >
        <path
          d='M1 1.5H19 M1 8H19 M1 14.5H19'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    'arrow-left': (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='14'
        viewBox='0 0 18 14'
        fill='none'
      >
        <path
          d='M17 7L1 7M1 7L7 13M1 7L7 1'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    youtube: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
      >
        <g clipPath='url(#clip0_283_462)'>
          <path
            d='M14.0037 11.7913L11.1963 10.4813C10.9513 10.3675 10.75 10.495 10.75 10.7662V13.2338C10.75 13.505 10.9513 13.6325 11.1963 13.5188L14.0025 12.2087C14.2488 12.0938 14.2487 11.9063 14.0037 11.7913ZM12 0C5.3725 0 0 5.3725 0 12C0 18.6275 5.3725 24 12 24C18.6275 24 24 18.6275 24 12C24 5.3725 18.6275 0 12 0ZM12 16.875C5.8575 16.875 5.75 16.3213 5.75 12C5.75 7.67875 5.8575 7.125 12 7.125C18.1425 7.125 18.25 7.67875 18.25 12C18.25 16.3213 18.1425 16.875 12 16.875Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_283_462'>
            <rect width='24' height='24' fill='currentColor' />
          </clipPath>
        </defs>
      </svg>
    ),
    telegram: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
      >
        <g clipPath='url(#clip0_283_464)'>
          <path
            d='M12 0.5C5.652 0.5 0.5 5.652 0.5 12C0.5 18.348 5.652 23.5 12 23.5C18.348 23.5 23.5 18.348 23.5 12C23.5 5.652 18.348 0.5 12 0.5ZM17.336 8.32C17.1635 10.137 16.416 14.553 16.0365 16.5885C15.8755 17.451 15.5535 17.7385 15.2545 17.773C14.5875 17.8305 14.0815 17.336 13.4375 16.9105C12.4255 16.2435 11.8505 15.8295 10.873 15.1855C9.7345 14.438 10.4705 14.024 11.126 13.357C11.2985 13.1845 14.2425 10.505 14.3 10.2635C14.308 10.2269 14.3069 10.1889 14.2969 10.1529C14.2869 10.1168 14.2682 10.0837 14.2425 10.0565C14.1735 9.999 14.0815 10.022 14.001 10.0335C13.8975 10.0565 12.2875 11.126 9.148 13.242C8.688 13.5525 8.274 13.7135 7.906 13.702C7.492 13.6905 6.71 13.472 6.1235 13.2765C5.399 13.0465 4.8355 12.92 4.8815 12.5175C4.9045 12.3105 5.192 12.1035 5.7325 11.885C9.0905 10.4245 11.3215 9.4585 12.437 8.9985C15.634 7.6645 16.2895 7.4345 16.7265 7.4345C16.8185 7.4345 17.037 7.4575 17.175 7.5725C17.29 7.6645 17.3245 7.791 17.336 7.883C17.3245 7.952 17.3475 8.159 17.336 8.32Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_283_464'>
            <rect width='24' height='24' fill='currentColor' />
          </clipPath>
        </defs>
      </svg>
    ),
    check: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
      >
        <path
          d='M6.00016 11.2002L2.80016 8.00016L1.86683 8.9335L6.00016 13.0668L14.0002 5.06683L13.0668 4.1335L6.00016 11.2002Z'
          fill='currentColor'
        />
      </svg>
    ),
  }

  return (
    <span
      data-testid='icon'
      className={cn(iconVariants({ size, color }), className)}
      aria-hidden='true'
    >
      {icons[icon]}
    </span>
  )
}
