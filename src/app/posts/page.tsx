'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'

// 高亮匹配文本组件
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>

  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-100/80 dark:bg-yellow-900/30 rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

// 防抖 hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

// 模拟博客文章数据，按年份分组
const posts = [
  {
    year: "2024",
    articles: [
      {
        title: "Markdown Syntax Guide",
        date: "2024-03-15",
        slug: "markdown-syntax-guide",
        excerpt: "A comprehensive guide to Markdown syntax and its usage in web content.",
        tags: ["Markdown", "Documentation", "Writing"]
      },
      {
        title: "Rich Content",
        date: "2024-03-14",
        slug: "rich-content",
        excerpt: "Exploring various types of rich content and their implementation.",
        tags: ["Content", "Web"]
      },
      {
        title: "More Rich Content",
        date: "2024-03-13",
        slug: "more-rich-content",
        excerpt: "Advanced techniques for handling rich content in web applications.",
        tags: ["Content", "Advanced", "Web"]
      }
    ]
  },
  {
    year: "2023",
    articles: [
      {
        title: "Math Typesetting",
        date: "2023-12-12",
        slug: "math-typesetting",
        excerpt: "A guide to mathematical notation and typesetting in web documents.",
        tags: ["Math", "LaTeX", "Documentation"]
      },
      {
        title: "HTML and CSS only tabs",
        date: "2023-11-11",
        slug: "html-css-tabs",
        excerpt: "Creating interactive tabs without JavaScript using modern CSS techniques.",
        tags: ["HTML", "CSS", "Web"]
      },
      {
        title: "Advanced React Patterns",
        date: "2023-10-15",
        slug: "advanced-react-patterns",
        excerpt: "Deep dive into advanced React patterns and best practices.",
        tags: ["React", "JavaScript", "Advanced"]
      },
      {
        title: "State Management in 2023",
        date: "2023-09-20",
        slug: "state-management-2023",
        excerpt: "Comparing modern state management solutions in React applications.",
        tags: ["React", "State Management", "JavaScript"]
      }
    ]
  },
  {
    year: "2022",
    articles: [
      {
        title: "Building with Next.js 13",
        date: "2022-12-25",
        slug: "nextjs-13",
        excerpt: "Exploring the new features and improvements in Next.js 13.",
        tags: ["Next.js", "React", "Web"]
      },
      {
        title: "TypeScript Best Practices",
        date: "2022-11-18",
        slug: "typescript-best-practices",
        excerpt: "A collection of TypeScript best practices and patterns.",
        tags: ["TypeScript", "JavaScript", "Best Practices"]
      },
      {
        title: "Modern CSS Techniques",
        date: "2022-10-05",
        slug: "modern-css",
        excerpt: "Latest CSS features and techniques for modern web development.",
        tags: ["CSS", "Web", "Modern"]
      },
      {
        title: "Web Performance Optimization",
        date: "2022-08-30",
        slug: "web-performance",
        excerpt: "Strategies and techniques for optimizing web application performance.",
        tags: ["Performance", "Web", "Optimization"]
      },
      {
        title: "Testing React Applications",
        date: "2022-07-15",
        slug: "testing-react",
        excerpt: "Comprehensive guide to testing React applications.",
        tags: ["React", "Testing", "JavaScript"]
      }
    ]
  }
];

// 获取所有唯一标签
const allTags = Array.from(new Set(
  posts.flatMap(yearGroup => 
    yearGroup.articles.flatMap(post => post.tags)
  )
)).sort();

export default function Posts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const debouncedQuery = useDebounce(searchQuery, 300)

  // 搜索逻辑
  const filteredPosts = useMemo(() => {
    return posts.map(yearGroup => ({
      year: yearGroup.year,
      articles: yearGroup.articles.filter(post => {
        const matchesQuery = !debouncedQuery || 
          post.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(debouncedQuery.toLowerCase())
        
        const matchesTags = selectedTags.length === 0 || 
          selectedTags.every(tag => post.tags.includes(tag))
        
        return matchesQuery && matchesTags
      })
    })).filter(yearGroup => yearGroup.articles.length > 0)
  }, [debouncedQuery, selectedTags])

  // 切换标签
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-8 sm:px-12 py-16">
      <header className="mb-16 space-y-8">
        <div>
          <h1 className="text-3xl font-medium">Writing</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Thoughts on programming, design, and the web.
          </p>
        </div>

        {/* 搜索和标签区域 */}
        <div className="space-y-6">
          {/* 搜索框 */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-zinc-200/50 via-zinc-200/25 to-zinc-200/50 dark:from-zinc-700/50 dark:via-zinc-700/25 dark:to-zinc-700/50 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            <div className="relative">
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm
                       border border-zinc-200 dark:border-zinc-700/50
                       focus:outline-none focus:border-zinc-300 dark:focus:border-zinc-600
                       text-zinc-900 dark:text-zinc-100 
                       placeholder-zinc-500 dark:placeholder-zinc-400
                       transition-all duration-200
                       shadow-sm hover:shadow-md"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none">
                {searchQuery ? (
                  <span className="text-sm tabular-nums">
                    {filteredPosts.reduce((acc, yearGroup) => acc + yearGroup.articles.length, 0)} 个结果
                  </span>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* 标签列表 */}
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200
                  ${selectedTags.includes(tag)
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="relative space-y-16">
        <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-zinc-200 via-zinc-200 to-zinc-200/20 dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800/20" />
        
        {filteredPosts.length > 0 ? (
          filteredPosts.map((yearGroup, groupIndex) => (
            <section key={yearGroup.year} className="relative">
              {/* 年份标记 */}
              <div className="sticky top-4 z-20 mb-8 flex items-center pl-4 sm:pl-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg">
                  <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {yearGroup.year}
                  </span>
                </div>
                <div className="ml-6 h-[2px] w-12 bg-gradient-to-r from-zinc-300 to-transparent dark:from-zinc-700" />
              </div>
              
              <div className="relative">
                <div className="space-y-12">
                  {yearGroup.articles.map((post, index) => (
                    <article 
                      key={post.slug} 
                      className="relative group pl-24 sm:pl-28 transition-all duration-300 hover:pl-32"
                    >
                      {/* 时间线圆点和连接线 */}
                      <div className="absolute left-[29px] sm:left-[33px] top-[14px] flex items-center">
                        <div className="relative">
                          <div className="absolute -inset-2 rounded-full blur-md bg-zinc-300 dark:bg-zinc-700 opacity-0 group-hover:opacity-30 transition-opacity" />
                          <div className="relative w-4 h-4 rounded-full border-[3px] border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 group-hover:scale-110 transition-all" />
                        </div>
                        <div className="h-[2px] w-8 bg-gradient-to-r from-zinc-300 to-transparent dark:from-zinc-700" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                          <h3 className="text-lg font-medium pr-4">
                            <Link 
                              href={`/posts/${post.slug}`}
                              className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                            >
                              <HighlightText text={post.title} query={debouncedQuery} />
                            </Link>
                          </h3>
                          <time 
                            dateTime={post.date}
                            className="text-sm text-zinc-500 dark:text-zinc-400 tabular-nums whitespace-nowrap"
                          >
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          <HighlightText text={post.excerpt} query={debouncedQuery} />
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-zinc-500 dark:text-zinc-400">
              没有找到相关文章
            </p>
          </div>
        )}
      </div>
    </main>
  )
}