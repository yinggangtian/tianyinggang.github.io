'use client'

import Link from 'next/link'
import { profile } from '../../profile'

export default function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-sm text-zinc-500 dark:text-zinc-400 space-y-2">
          <div className="flex items-center gap-1">
            <span>Created with</span>
            <Link 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Next.js
            </Link>
          </div>
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
} 