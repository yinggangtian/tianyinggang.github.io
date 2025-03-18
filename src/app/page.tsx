'use client'

import Profile from '@/components/Profile'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="bg-white dark:bg-zinc-900">
        <Profile />
      </div>
    </main>
  )
}