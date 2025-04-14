'use client'

import Image from 'next/image'
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { profile } from '../../profile'

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-900">
      {/* Avatar and Name */}
      <div className="text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src="/images/avatar.jpg"
            alt={profile.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-medium mb-2">{profile.name}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{profile.role}</p>
      </div>

      {/* Introduction */}
      <div className="text-center mb-8">
        <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4 font-light">
          {profile.introduction.passion}
        </p>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 italic">
          {profile.introduction.current}
        </p>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-8">
        <a
          href={`mailto:${profile.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
        >
          <FaEnvelope className="w-6 h-6" />
          <span className="sr-only">Email</span>
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
        >
          <FaGithub className="w-6 h-6" />
          <span className="sr-only">GitHub</span>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
        >
          <FaLinkedin className="w-6 h-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a
          href={profile.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
        >
          <FaInstagram className="w-6 h-6" />
          <span className="sr-only">Instagram</span>
        </a>
      </div>
    </div>
  )
}