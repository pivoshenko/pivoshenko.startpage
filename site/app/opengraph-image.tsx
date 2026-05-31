import { createOgImage } from 'pivoshenko.ui/next/opengraph-image'

export const alt = 'pivoshenko.startpage'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'edge'

export default createOgImage({
  brand: 'pivoshenko.startpage',
  title: 'Startpage',
  subtitle: 'A minimal personal startpage with quick links and daily resources',
  domain: 'startpage.pivoshenko.dev',
})
