export type IconType =
  | 'arrow-right'
  | 'chevron-down'
  | 'search'
  | 'close'
  | 'hamburger'
  | 'chevron-right'
  | 'arrow-left'
  | 'youtube'
  | 'telegram'

export type IconProps = {
  icon: IconType
  size?: 'sm' | 'md' | 'lg'
  color?: 'contrast' | 'primary' | 'secondary' | 'foreground' | 'white'
  className?: string
}
