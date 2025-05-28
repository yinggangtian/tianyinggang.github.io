import BlogNavigation from '@/components/BlogNavigation'

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <BlogNavigation />
      {children}
    </div>
  )
}