'use client'

import Image from 'next/image'
import { profile } from '../../profile'

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <Image
            src="/images/avatar.jpg"
            alt={profile.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-medium mb-4">{profile.name}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{profile.role}</p>
      </div>
    </div>
  )
}