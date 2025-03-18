'use client'

import Image from 'next/image'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { SiXiaohongshu } from 'react-icons/si'

interface Experience {
  title: string
  company: string
  period: string
  description: string
  logo?: string
}

interface Education {
  degree: string
  school: string
  period: string
  description: string
  logo?: string
}

interface Research {
  title: string
  description: string
}

export default function Profile() {
  const experiences: Experience[] = [
    {
      title: "AUTOSAR Architect",
      company: "HL Mando",
      period: "Nov 2023 - Dec 2024",
      description: "Full-time AUTOSAR Architect position focusing on automotive software architecture design and implementation.",
      logo: "/images/hl-mando-logo.png"
    },
    {
      title: "AUTOSAR Development",
      company: "Huawei",
      period: "Sep 2021 - Nov 2023",
      description: "Full-time AUTOSAR development role, working on automotive software solutions.",
      logo: "/images/huawei-logo.png"
    },
    {
      title: "Software Engineer",
      company: "Sercomm",
      period: "Jul 2020 - Sep 2021",
      description: "Permanent Software Engineer position in Suzhou, Jiangsu Province, China.",
      logo: "/images/sercomm-logo.png"
    },
    {
      title: "Full Stack Development Engineer",
      company: "Microsoft",
      period: "Jan 2020 - Sep 2020",
      description: "Developed Knowledge Base for New Coronavirus Related Consulting in Wuhan. Built WeChat robots using Microsoft Epidemic Intelligent Question and Answer Solution Dialog Engine.",
      logo: "/images/microsoft-logo.png"
    }
  ]

  const education: Education[] = [
    {
      degree: "Master of Data Science",
      school: "Monash University",
      period: "2022 - 2024",
      description: "Focusing on machine learning, data analysis, and statistical modeling.",
      logo: "/images/monash-logo.svg"
    }
  ]

  const research: Research[] = [
    {
      title: "Machine Learning in Healthcare",
      description: "Research on applying machine learning techniques to healthcare data analysis."
    }
  ]

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-16 text-center">
        <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8 font-light">
          Passionate about applying <span className="text-zinc-900 dark:text-zinc-200">machine learning</span> and <span className="text-zinc-900 dark:text-zinc-200">data science</span> to solve real-world problems.
        </p>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 italic">
          Currently pursuing research at Monash University
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-8 mb-16">
        <a
          href="mailto:yinggang.tian@monash.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
        >
          <FaEnvelope className="w-6 h-6" />
          <span className="sr-only">Email</span>
        </a>
        <a
          href="https://www.linkedin.com/in/yinggang-tian"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
        >
          <FaLinkedin className="w-6 h-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a
          href="https://github.com/tianyinggang"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
        >
          <FaGithub className="w-6 h-6" />
          <span className="sr-only">GitHub</span>
        </a>
        <a
          href="https://www.instagram.com/tianyinggang"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
        >
          <FaInstagram className="w-6 h-6" />
          <span className="sr-only">Instagram</span>
        </a>
        <a
          href="https://www.xiaohongshu.com/user/profile/5e7b3b3e000000000100a7c9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-110"
        >
          <SiXiaohongshu className="w-6 h-6" />
          <span className="sr-only">小红书</span>
        </a>
      </div>

      {/* Research Section */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-8 uppercase tracking-wider">
          Research
        </h2>
        <div className="space-y-4">
          {research.map((item, index) => (
            <div key={index} className="group">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-8 uppercase tracking-wider">
          Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="group flex gap-4">
              {exp.logo && (
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {exp.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">{exp.company}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-2">{exp.period}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-8 uppercase tracking-wider">
          Education
        </h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="group flex gap-4">
              {edu.logo && (
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {edu.degree}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">{edu.school}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-2">{edu.period}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}