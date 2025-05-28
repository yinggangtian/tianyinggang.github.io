'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile } from '../../profile'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="px-4 pt-8 pb-4 md:px-6 md:pt-10 md:pb-4 text-slate-700 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-3xl">
        <div className="grid grid-cols-1 justify-items-center gap-16">
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
          <div className="px-4">
            <div className="grid max-w-lg grid-cols-1 justify-items-center gap-8">
              <Link href="/" tabIndex={-1}>
                <div className="relative h-40 w-40 overflow-hidden rounded-full bg-slate-300">
                  <Image
                    src="/images/avatar.jpg"
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="grid grid-cols-1 gap-2 text-center">
                <h1 className="font-sans font-semibold tracking-tighter text-slate-800 dark:text-white text-3xl md:text-4xl">
                  <Link href="/">{profile.name}</Link>
                </h1>
                <p className="font-serif text-2xl italic leading-normal tracking-tight text-slate-500 dark:text-zinc-400">
                  {profile.introduction.passion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}