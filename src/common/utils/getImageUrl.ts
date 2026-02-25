export const getImageUrl = (src: string) => {
  const directusCmsUrl = process.env.NEXT_PUBLIC_DIRECTUS_CMS_URL

  if (!directusCmsUrl) {
    throw new Error(
      'NEXT_PUBLIC_DIRECTUS_CMS_URL environment variable is not defined',
    )
  }

  return `https://${directusCmsUrl}/assets/${src}`
}
