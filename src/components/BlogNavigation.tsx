'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile } from '../../profile'
import { useEffect, useState } from 'react'

// NavItem component for consistent styling across navigation items
const NavItem = ({ 
  children, 
  isActive = false 
}: { 
  children: React.ReactNode; 
  isActive?: boolean;
}) => {
  return (
    <li className={`font-semibold tracking-tight ${
      isActive 
        ? 'text-slate-800 dark:text-white' 
        : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white'
      } transition-colors`}>
      {children}
    </li>
  );
};

export default function BlogNavigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-4 py-4 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="mx-auto w-full max-w-3xl">
        <nav>
          <ul className="flex flex-wrap justify-center gap-10">
            <NavItem isActive={isActive('/')}>
              <Link href="/">Home</Link>
            </NavItem>
            <NavItem isActive={isActive('/posts')}>
              <Link href="/posts">Blog</Link>
            </NavItem>
            <NavItem>
              <Link 
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </NavItem>
          </ul>
        </nav>
      </div>
    </header>
  )
}
