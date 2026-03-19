export type SocialPlatform = 'youtube' | 'telegram' | 'whatsapp'

type PlatformEntry = {
  domains: string[]
  platform: SocialPlatform
}

const PLATFORM_REGISTRY: PlatformEntry[] = [
  { domains: ['youtube.com', 'youtu.be'], platform: 'youtube' },
  {
    domains: ['t.me', 'telegram.me', 'telegram.org'],
    platform: 'telegram',
  },
  { domains: ['wa.me', 'whatsapp.com'], platform: 'whatsapp' },
]

export function detectSocialPlatform(href: string): SocialPlatform | null {
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
