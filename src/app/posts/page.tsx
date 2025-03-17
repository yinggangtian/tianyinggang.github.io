// 服务器端组件
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { PostsList } from './PostsList'

// 获取所有文章
async function getAllPosts() {
  const postsDirectory = join(process.cwd(), 'content')
  const filenames = readdirSync(postsDirectory)
  
  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = join(postsDirectory, filename)
      const fileContents = readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags || []
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  // 按年份分组
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as Record<string, typeof posts>)
  
  return Object.entries(postsByYear)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, articles]) => ({
      year,
      articles
    }))
}

// 获取所有标签
function getAllTags(posts: Awaited<ReturnType<typeof getAllPosts>>) {
  return Array.from(new Set(
    posts.flatMap(yearGroup => 
      yearGroup.articles.flatMap(post => post.tags)
    )
  )).sort()
}

export default async function Posts() {
  const posts = await getAllPosts()
  const allTags = getAllTags(posts)
  
  return <PostsList initialPosts={posts} allTags={allTags} />
}