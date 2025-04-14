import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
// import { GeistSans } from 'geist/font/sans' todo：make a logo front 
import Footer from '@/components/Footer'
import { profile } from '../../profile'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${profile.name}`,
    default: profile.name,
  },
  description: `${profile.name} - ${profile.role}. ${profile.introduction.passion}`,
  openGraph: {
    title: profile.name,
    description: profile.introduction.passion,
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
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#18181b"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}