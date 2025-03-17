'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以在这里添加错误日志上报
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-8 text-center">
      <h2 className="text-2xl font-medium mb-4">Something went wrong!</h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md">
        {error.message || 'An unexpected error occurred. Please try again later.'}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900
          hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
      >
        Try again
      </button>
    </div>
  )
} 