'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { profile } from '../../profile'

export default function Hero() {
  return (
    <main className="min-h-[calc(100vh-300px)] flex flex-col justify-center px-4 py-8 md:px-6 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="grid grid-cols-1 gap-8">
          {/* Social Links */}
          <div className="flex items-center justify-center gap-8">
            <a
              href={`mailto:${profile.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
            >
              <FaEnvelope className="w-6 h-6" />
              <span className="sr-only">Email</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
            >
              <FaGithub className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
            >
              <FaLinkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
            >
              <FaInstagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
          
          <hr className="h-px w-1/2 border-0 bg-slate-200 md:max-w-sm mx-auto" />
          
          <p className="font-serif text-lg md:text-xl leading-relaxed tracking-normal text-slate-600 dark:text-zinc-400 text-center">
            {profile.introduction.current}
          </p>
        </div>
      </div>
    </main>
  )
}