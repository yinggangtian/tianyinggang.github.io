'use client'

import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { useState } from 'react'

interface ImageProps extends NextImageProps {
  aspectRatio?: number
}

export default function Image({ aspectRatio, ...props }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div
      className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-lg"
      style={{ paddingBottom: aspectRatio ? `${(1 / aspectRatio) * 100}%` : undefined }}
    >
      <NextImage
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl' : 'scale-100 blur-0'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
    </div>
  )
} 