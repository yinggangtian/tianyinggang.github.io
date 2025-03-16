import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

// 从主页面复制文章数据
const posts = {
  'markdown-syntax-guide': {
    title: "Markdown 语法指南",
    date: "2024-03-15",
    content: `
# Markdown 语法指南

这是一个全面的 Markdown 语法指南，帮助你更好地编写文档。

## 基础语法

### 标题

使用 \`#\` 符号来创建标题，例如：

# 一级标题
## 二级标题
### 三级标题

### 强调

*斜体* 或 _斜体_
**粗体** 或 __粗体__
***粗斜体*** 或 ___粗斜体___

### 列表

无序列表：
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2

有序列表：
1. 第一项
2. 第二项
3. 第三项

### 引用

> 这是一个引用示例。
> 可以有多行。
> > 也可以嵌套引用。

### 代码

行内代码：\`const example = "hello world"\`

代码块：
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`)
}
\`\`\`

### 链接和图片

[链接文本](https://example.com)
![图片描述](https://example.com/image.jpg)

### 表格

| 表头 1 | 表头 2 |
|--------|--------|
| 单元格 1 | 单元格 2 |
| 单元格 3 | 单元格 4 |
    `,
    tags: ["Markdown", "Documentation", "Writing"]
  },
  'rich-content': {
    title: "富文本内容指南",
    date: "2024-03-14",
    content: `
# 富文本内容指南

本文将探讨各种富文本内容的实现方式。

## 常见富文本元素

### 1. 图片和多媒体

在现代网页中，图片和多媒体内容是不可或缺的元素。

### 2. 交互式组件

按钮、表单、轮播图等交互式组件能够提升用户体验。

### 3. 动画效果

适当的动画效果可以让页面更加生动。

## 最佳实践

1. 确保内容的可访问性
2. 优化性能
3. 保持一致的设计风格
    `,
    tags: ["Content", "Web"]
  }
  // ... 其他文章
}

// Markdown 转 HTML 的函数
async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown)
  return result.toString()
}

type Props = {
  params: {
    slug: string
  }
}

// 生成静态页面参数
export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({
    slug,
  }))
}

// 生成元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts[params.slug as keyof typeof posts]
  
  if (!post) {
    return {
      title: '文章未找到'
    }
  }

  return {
    title: post.title,
    description: post.content.slice(0, 160),
  }
}

export default async function Post({ params }: Props) {
  const post = posts[params.slug as keyof typeof posts]

  if (!post) {
    notFound()
  }

  const content = await markdownToHtml(post.content)

  return (
    <main className="max-w-3xl mx-auto px-8 sm:px-12 py-16">
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        {/* 文章头部 */}
        <header className="mb-8 not-prose">
          <Link 
            href="/posts"
            className="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回文章列表
          </Link>

          <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
            {post.title}
          </h1>
          <time 
            dateTime={post.date}
            className="mt-2 block text-sm text-zinc-600 dark:text-zinc-400"
          >
            {new Date(post.date).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>

        {/* 文章标签 */}
        <div className="flex flex-wrap gap-2 mb-8 not-prose">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium rounded-md
                bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 文章内容 */}
        <div 
          className="mt-8 prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800 prose-pre:p-4 prose-pre:rounded-lg
            prose-img:rounded-lg prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </article>
    </main>
  )
} 