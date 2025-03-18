'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <div className={`text-center transform transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}>
        <div className="relative w-48 h-48 mx-auto mb-8">
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="transition-all duration-300 ease-out">
          <h1 className="text-4xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
            Yinggang Tian
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            AUTOSAR Architect & Data Science Researcher
          </p>
        </div>
      </div>
    </div>
  )
}