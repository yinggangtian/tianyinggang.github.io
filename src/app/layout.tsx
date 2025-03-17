import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: {
    template: '%s | Your Name',
    default: 'Your Name - Personal Blog'
  },
  description: 'A blog about programming, design, and technology.',
  openGraph: {
    title: 'Your Name - Personal Blog',
    description: 'A blog about programming, design, and technology.',
    url: 'https://yourdomain.com',
    siteName: 'Your Name',
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
    title: 'Your Name',
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
    <html lang="en" className="scroll-smooth">
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
      <body className={`${inter.className} antialiased bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}>
        {children}
      </body>
    </html>
  )
}
