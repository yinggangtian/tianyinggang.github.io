import Profile from '@/components/Profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about my background, research, and experience.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Profile />
    </main>
  )
} 