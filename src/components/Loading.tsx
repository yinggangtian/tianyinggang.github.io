export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-8 h-8 absolute left-0 top-0 rounded-full border-4 border-zinc-200 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full rotate-45">
          <div className="w-6 h-6 absolute right-0 bottom-0 rounded-full border-4 border-zinc-200 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />
        </div>
      </div>
    </div>
  )
} 