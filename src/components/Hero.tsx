'use client'

import Image from 'next/image'
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { profile } from '../../profile'

export default function Hero() {
  return (
    <main className="pt-36 md:pt-40 lg:pt-48 min-h-screen flex flex-col justify-center px-4 py-8 md:px-6 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="grid grid-cols-1 gap-8">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full ring-2 ring-slate-200 dark:ring-zinc-700">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Name and Role */}
          <div className="text-center mt-4">
            <h1 className="font-sans font-bold tracking-tighter text-slate-800 dark:text-white text-3xl md:text-4xl lg:text-5xl mb-4">
              {profile.name}
            </h1>
            <p className="font-serif text-xl text-slate-600 dark:text-zinc-400 mb-6">
              {profile.role}
            </p>
            <p className="font-serif text-2xl italic leading-normal tracking-tight text-slate-500 mt-6">
              {profile.introduction.passion}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-8 mt-8">
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
          
          <hr className="h-px w-1/2 border-0 bg-slate-200 dark:bg-zinc-800 md:max-w-sm mx-auto my-4" />
          <p className="font-serif text-lg md:text-xl leading-relaxed tracking-normal text-slate-600 dark:text-zinc-400 text-center mb-12">
            {profile.introduction.current}
          </p>
        </div>
      </div>
    </main>
  )
}
