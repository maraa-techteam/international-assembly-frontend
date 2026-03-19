import {
  SocialPlatform,
  detectBlockPlatform,
  detectSocialPlatform,
} from './socialIconRegistry'

// SVG path data mirroring the social icons defined in Icon.tsx.
// The viewBox for all icons is "0 -960 960 960".
const SOCIAL_ICON_PATHS: Record<SocialPlatform, string> = {
  youtube:
    '<path transform="translate(0, -960) scale(40)" d="M14.0037 11.7913L11.1963 10.4813C10.9513 10.3675 10.75 10.495 10.75 10.7662V13.2338C10.75 13.505 10.9513 13.6325 11.1963 13.5188L14.0025 12.2087C14.2488 12.0938 14.2487 11.9063 14.0037 11.7913ZM12 0C5.3725 0 0 5.3725 0 12C0 18.6275 5.3725 24 12 24C18.6275 24 24 18.6275 24 12C24 5.3725 18.6275 0 12 0ZM12 16.875C5.8575 16.875 5.75 16.3213 5.75 12C5.75 7.67875 5.8575 7.125 12 7.125C18.1425 7.125 18.25 7.67875 18.25 12C18.25 16.3213 18.1425 16.875 12 16.875Z" fill="currentColor" />',
  telegram:
    '<path transform="translate(0, -960) scale(48)" d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.64 6.8C14.49 8.38 13.84 12.22 13.51 13.99C13.37 14.74 13.09 14.99 12.83 15.02C12.25 15.07 11.81 14.64 11.25 14.27C10.37 13.69 9.87 13.33 9.02 12.77C8.03 12.12 8.67 11.76 9.24 11.18C9.39 11.03 11.95 8.7 12 8.49C12.0069 8.45819 12.006 8.42517 11.9973 8.3938C11.9886 8.36244 11.9724 8.33367 11.95 8.31C11.89 8.26 11.81 8.28 11.74 8.29C11.65 8.31 10.25 9.24 7.52 11.08C7.12 11.35 6.76 11.49 6.44 11.48C6.08 11.47 5.4 11.28 4.89 11.11C4.26 10.91 3.77 10.8 3.81 10.45C3.83 10.27 4.08 10.09 4.55 9.9C7.47 8.63 9.41 7.79 10.38 7.39C13.16 6.23 13.73 6.03 14.11 6.03C14.19 6.03 14.38 6.05 14.5 6.15C14.6 6.23 14.63 6.34 14.64 6.42C14.63 6.48 14.65 6.66 14.64 6.8Z" fill="currentColor" />',
  whatsapp:
    '<path transform="translate(0, -960) scale(40)" fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12c0 2.117.552 4.183 1.6 6.008L0 24l6.156-1.566A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0Zm0 21.818c-1.835 0-3.63-.494-5.2-1.43l-.372-.221-3.653.93.975-3.56-.242-.365A9.77 9.77 0 0 1 2.182 12c0-5.413 4.405-9.818 9.818-9.818 5.413 0 9.818 4.405 9.818 9.818 0 5.413-4.405 9.818-9.818 9.818Zm5.387-7.352c-.294-.147-1.738-.857-2.007-.955-.269-.098-.465-.147-.661.147-.196.294-.759.955-.931 1.151-.171.196-.343.221-.637.074-.294-.147-1.241-.457-2.364-1.457-.874-.779-1.464-1.741-1.635-2.035-.171-.294-.018-.453.129-.599.132-.131.294-.343.441-.514.147-.171.196-.294.294-.49.098-.196.049-.368-.025-.514-.074-.147-.661-1.591-.906-2.178-.238-.571-.48-.494-.661-.503l-.563-.01c-.196 0-.514.074-.784.368-.269.294-1.029 1.005-1.029 2.45 0 1.444 1.054 2.84 1.201 3.036.147.196 2.076 3.172 5.029 4.447.702.303 1.249.484 1.676.619.704.224 1.345.192 1.852.116.565-.084 1.738-.71 1.983-1.396.245-.686.245-1.274.171-1.396-.073-.123-.269-.196-.563-.343Z" />',
  phone:
    '<path fill="currentColor" d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />',
  website:
    '<path fill="currentColor" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />',
}

function buildIconSvg(platform: SocialPlatform): string {
  return `<svg aria-hidden="true" viewBox="0 -960 960 960" class="rte-social-icon" fill="none" xmlns="http://www.w3.org/2000/svg">${SOCIAL_ICON_PATHS[platform]}</svg>`
}

export function enrichLinksWithIcons(html: string): string {
  // Step 1: inject social icons into ALL matching social links (inline or block).
  let result = html.replace(/<a(\s[^>]*)>/gi, (match, attrs: string) => {
    const hrefMatch = /href=["']([^"']+)["']/i.exec(attrs)
    if (!hrefMatch) return match

    const platform = detectSocialPlatform(hrefMatch[1])
    if (!platform) return match

    return `${match}${buildIconSvg(platform)}`
  })

  // Step 2: inject phone/website icons only when the link is the sole content
  // of a <p> element (i.e. it is on its own row).
  // Note: nested <a> tags are not possible here because sanitize-html strips
  // them before this function is called, so the lazy [\s\S]*? pattern is safe.
  result = result.replace(
    /<p([^>]*)>\s*(<a(\s[^>]*)>)([\s\S]*?)<\/a>\s*<\/p>/gi,
    (
      match,
      pAttrs: string,
      openTag: string,
      aAttrs: string,
      content: string,
    ) => {
      const hrefMatch = /href=["']([^"']+)["']/i.exec(aAttrs)
      if (!hrefMatch) return match

      const platform = detectBlockPlatform(hrefMatch[1])
      if (!platform) return match

      return `<p${pAttrs}>${openTag}${buildIconSvg(platform)}${content}</a></p>`
    },
  )

  return result
}
