export type InlinePlatform = 'youtube' | 'telegram' | 'whatsapp'
export type BlockPlatform = 'phone' | 'website'
export type SocialPlatform = InlinePlatform | BlockPlatform

type PlatformEntry = {
  domains: string[]
  platform: InlinePlatform
}

const PLATFORM_REGISTRY: PlatformEntry[] = [
  { domains: ['youtube.com', 'youtu.be'], platform: 'youtube' },
  {
    domains: ['t.me', 'telegram.me', 'telegram.org'],
    platform: 'telegram',
  },
  { domains: ['wa.me', 'whatsapp.com'], platform: 'whatsapp' },
]

export function detectSocialPlatform(href: string): InlinePlatform | null {
  let hostname: string

  try {
    hostname = new URL(href).hostname.toLowerCase()
  } catch {
    return null
  }

  for (const entry of PLATFORM_REGISTRY) {
    for (const domain of entry.domains) {
      if (hostname === domain || hostname.endsWith(`.${domain}`)) {
        return entry.platform
      }
    }
  }

  return null
}

// Detects links that should only receive an icon when they are standalone in a
// block element (i.e. the sole content of a <p> tag).
export function detectBlockPlatform(href: string): BlockPlatform | null {
  if (href.startsWith('tel:')) return 'phone'
  if (/^https?:\/\//i.test(href) && !detectSocialPlatform(href))
    return 'website'
  return null
}
