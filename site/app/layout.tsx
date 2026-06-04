import {
  SiteLayout,
  siteMetadata,
  siteViewport,
} from 'pivoshenko.ui/next/site-layout'
import './globals.css'

export const metadata = siteMetadata({
  url: 'https://startpage.pivoshenko.dev',
  brand: 'pivoshenko.startpage',
  title: 'pivoshenko.startpage',
  titleTemplate: '%s — pivoshenko.startpage',
  description: 'Personal startpage with quick links and daily resources.',
  ogTitle: 'Startpage',
  ogDescription:
    'A minimal personal startpage with quick links and daily resources',
})

export const viewport = siteViewport

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SiteLayout brand="pivoshenko.startpage">{children}</SiteLayout>
}
