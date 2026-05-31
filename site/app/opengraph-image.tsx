import {
  createOgImage,
  ogContentType,
  ogRuntime,
  ogSize,
} from 'pivoshenko.ui/next/opengraph-image'

export const alt = 'pivoshenko.startpage'
export const size = ogSize
export const contentType = ogContentType
export const runtime = ogRuntime

export default createOgImage({
  brand: 'pivoshenko.startpage',
  title: 'Startpage',
  subtitle: 'A minimal personal startpage with quick links and daily resources',
  domain: 'startpage.pivoshenko.dev',
})
