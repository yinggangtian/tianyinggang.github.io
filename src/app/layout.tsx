import './globals.css'
import { Inter, Libre_Baskerville } from "next/font/google";
import { Metadata } from 'next'
import Footer from '@/components/Footer'
import { profile } from '../../profile'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})
const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--libre-baskerville",
  display: "swap",
});

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
  // Using pathname logic in client component instead

  return (
    <html 
      lang="en" 
      className={`${inter.className} ${libre_baskerville.className}`}
    >
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
      <body className="overflow-x-hidden antialiased bg-white text-slate-700 dark:bg-zinc-900 dark:text-zinc-100">
        <main>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}