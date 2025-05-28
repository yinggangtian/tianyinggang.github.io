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
import rehypePrism from 'rehype-prism-plus'
import 'prismjs/themes/prism-coy.css'                      // 主题样式
import 'prismjs/plugins/line-numbers/prism-line-numbers.css' // 行号样式

// 定义 Post 类型，明确 tags 是 string[]
interface Post {
  title: string
  date: string
  content: string
  tags: string[]
}

// Markdown 转 HTML 的函数
async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .use(rehypePrism, {
      ignoreMissing: true,    // 跳过不支持的语言
      showLineNumbers: true,  // 显示行号
      plugins: ['line-numbers'],
    })
    .process(markdown)
  return result.toString()
}

// 获取文章内容
async function getPost(slug: string): Promise<Post | null> {
  try {
    const filePath = join(process.cwd(), 'content', `${slug}.md`)
    const fileContents = readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const htmlContent = await markdownToHtml(content)

    return {
      title: data.title,
      date: data.date,
      content: htmlContent,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : []
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Next.js App Router 自动生成的类型里，params 是 Promise<any>
type PageProps = {
  params: Promise<{ slug: string }>
}

// 生成页面元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    }
  }

  return {
    title: post.title,
    description: post.content.slice(0, 160),
  }
}

// 页面组件
export default async function Post({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="pt-24 max-w-3xl mx-auto px-8 sm:px-12 py-16">
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
            {post.tags.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400"
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
