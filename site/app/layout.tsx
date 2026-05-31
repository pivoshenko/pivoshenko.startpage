import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { JetBrains_Mono } from 'next/font/google'
import { PageShell } from 'pivoshenko.ui'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://startpage.pivoshenko.dev'),
  title: {
    template: '%s — pivoshenko.startpage',
    default: 'pivoshenko.startpage',
  },
  description: 'Personal startpage with quick links and daily resources.',
  openGraph: {
    type: 'website',
    url: 'https://startpage.pivoshenko.dev',
    siteName: 'pivoshenko.startpage',
    title: 'Startpage',
    description:
      'A minimal personal startpage with quick links and daily resources',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startpage',
    description:
      'A minimal personal startpage with quick links and daily resources',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={jetbrainsMono.variable}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageShell brand="pivoshenko.startpage">{children}</PageShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
