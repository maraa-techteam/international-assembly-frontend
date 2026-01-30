export type IconType =
  | 'arrow-right'
  | 'chevron-down'
  | 'search'
  | 'close'
  | 'hamburger'
  | 'chevron-right'
  | 'double-chevron-right'
  | 'arrow-left'
  | 'youtube'
  | 'telegram'
  | 'check'
  | 'person'
  | 'phone'
  | 'website'

export type IconProps = {
  icon: IconType
  size?: 'sm' | 'md' | 'lg'
  color?: 'contrast' | 'primary' | 'secondary' | 'foreground' | 'white'
  className?: string
}
