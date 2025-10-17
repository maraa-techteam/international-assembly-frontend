import { ImageLoaderProps } from 'next/image'

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://${process.env.DIRECTUS_CMS_URL}/assets/${src}?width=${width}&quality=${quality || 75}`
}

export default imageLoader
