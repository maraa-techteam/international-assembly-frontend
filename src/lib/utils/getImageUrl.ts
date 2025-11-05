const getImageUrl = (src: string) => {
  return `https://${process.env.DIRECTUS_CMS_URL}/assets/${src}`
}

export default getImageUrl
