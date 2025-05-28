'use client'

import Link from 'next/link'
import { profile } from '../../profile'

export default function Footer() {
  return (
    <footer className="px-4 py-8 md:px-6 md:py-10 lg:py-12 border-t border-slate-200 dark:border-zinc-800/50">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-col items-center justify-center text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-1">
            <span>Created with</span>
            <Link 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold tracking-tight text-slate-800 dark:hover:text-white transition-colors"
            >
              Next.js
            </Link>
            <span className="mx-1">©</span>
            <span>{new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}