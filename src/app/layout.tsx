import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import { GeistSans } from 'geist/font/sans'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: {
    template: '%s | Yinggang Tian',
    default: 'Yinggang Tian',
  },
  description: 'Personal website of Yinggang Tian - AUTOSAR Architect & Data Science Researcher',
  openGraph: {
    title: 'Yinggang Tian',
    description: 'Personal website of Yinggang Tian - AUTOSAR Architect & Data Science Researcher',
    url: 'https://yourdomain.com',
    siteName: 'Yinggang Tian',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Yinggang Tian',
    card: 'summary_large_image',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="preload"
          href="/fonts/your-custom-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#18181b" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="antialiased bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
        <Navigation />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  )
}
