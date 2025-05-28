'use client'

import Image from 'next/image'
import { profile } from '../../profile'

export default function Profile() {
  return (
    <div className="px-4 py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-3xl">
        {/* Research Section */}
        <section className="mb-16">
          <h2 className="font-sans font-semibold tracking-tighter text-slate-800 dark:text-white text-2xl md:text-3xl mb-8">
            Research
          </h2>
          <div className="space-y-8">
            {profile.research.map((research, index) => (
              <div key={index} className="group">
                <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-2">
                  {research.title}
                </h3>
                <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed text-slate-600 dark:text-zinc-400">
                  {research.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="font-sans font-semibold tracking-tighter text-slate-800 dark:text-white text-2xl md:text-3xl mb-8">
            Experience
          </h2>
          <div className="space-y-8">
            {profile.experiences.map((exp, index) => (
              <div key={index} className="group flex gap-4">
                {exp.logo && (
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-medium text-slate-800 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-zinc-400 mb-1">{exp.company}</p>
                  <p className="font-serif italic tracking-tighter text-slate-500 dark:text-zinc-500 mb-2">{exp.period}</p>
                  <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed text-slate-600 dark:text-zinc-400">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="font-sans font-semibold tracking-tighter text-slate-800 dark:text-white text-2xl md:text-3xl mb-8">
            Education
          </h2>
          <div className="space-y-8">
            {profile.education.map((edu, index) => (
              <div key={index} className="group flex gap-4">
                {edu.logo && (
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={edu.logo}
                      alt={`${edu.school} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-medium text-slate-800 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-zinc-400 mb-1">{edu.school}</p>
                  <p className="font-serif italic tracking-tighter text-slate-500 dark:text-zinc-500">{edu.period}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}