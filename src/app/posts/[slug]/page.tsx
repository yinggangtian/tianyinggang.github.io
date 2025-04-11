import { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

// Markdown 转 HTML 的函数
async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .use(rehypeHighlight, { ignoreMissing: true }) // 添加代码块高亮支持
    .process(markdown)
  return result.toString()
}

interface Props {
  params: {
    slug: string
  }
}

// 获取文章内容
async function getPost(slug: string) {
  try {
    const filePath = join(process.cwd(), 'content', `${slug}.md`)
    const fileContents = readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const htmlContent = await markdownToHtml(content)
    
    return {
      title: data.title,
      date: data.date,
      content: htmlContent,
      tags: data.tags || []
    }
  } catch (error) {
    return null
  }
}

// 生成元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    }
  }

  return {
    title: post.title,
    description: post.content.slice(0, 160)
  }
}

// 文章页面组件
export default async function Post({ params }: Props) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto px-8 sm:px-12 py-16">
      <header className="mb-16 space-y-8">
        <div>
          <Link 
            href="/posts"
            className="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Posts
          </Link>

          <h1 className="text-3xl font-medium mt-4">{post.title}</h1>
          <time 
            dateTime={post.date}
            className="mt-2 block text-sm text-zinc-500 dark:text-zinc-400"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs font-medium
                  bg-zinc-100 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div 
        className="prose prose-zinc dark:prose-invert max-w-none
          prose-headings:scroll-mt-20
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800 prose-pre:p-4 prose-pre:rounded-lg
          prose-img:rounded-lg prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}