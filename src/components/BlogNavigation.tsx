'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile } from '../../profile'

export default function BlogNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="px-4 py-8 md:px-6 md:py-10 lg:py-12 text-slate-700 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-3xl">
        <div className="grid grid-cols-1 justify-items-center">
          <nav>
            <ul className="flex flex-wrap justify-center gap-10">
              <li className="font-semibold tracking-tight text-slate-800 dark:text-white">
                <Link href="/">Home</Link>
              </li>
              <li className="font-semibold tracking-tight text-slate-800 dark:text-white">
                <Link href="/posts">Blog</Link>
              </li>
              <li className="font-semibold tracking-tight text-slate-800 dark:text-white">
                <Link 
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
