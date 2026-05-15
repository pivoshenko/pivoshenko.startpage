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
  title: {
    template: '%s — pivoshenko.startpage',
    default: 'pivoshenko.startpage',
  },
  description: 'Personal startpage with quick links and daily resources.',
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

const navLinks = [
  { href: 'https://pivoshenko.dev', label: 'Blog', external: true },
  { href: 'https://theme.pivoshenko.dev', label: 'Theme', external: true },
  {
    href: 'https://wallpapers.pivoshenko.dev',
    label: 'Wallpapers',
    external: true,
  },
]

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
          <PageShell brand="pivoshenko.startpage" navLinks={navLinks}>
            {children}
          </PageShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
