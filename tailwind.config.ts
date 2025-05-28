import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // 1. 扩展 fontFamily，让 font-sans 首选 --font-inter 变量
      fontFamily: {
        sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        serif:
          'var(--libre-baskerville), ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      },

      // 2. 保留并合并你现有的 typography 配置
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },
            'h1,h2,h3,h4': { 'scroll-margin-top': '5rem' },
            pre: {
              'background-color': 'rgb(244 244 245)',
              color: 'rgb(39 39 42)',
              'border-radius': '0.5rem',
              padding: '1rem',
              'overflow-x': 'auto',
            },
            code: {
              'background-color': 'rgb(244 244 245)',
              color: 'rgb(39 39 42)',
              padding: '0.25rem 0.5rem',
              'border-radius': '0.25rem',
              'font-size': '0.875em',
            },
            a: {
              'text-decoration': 'none',
              'border-bottom': '1px solid rgb(37 99 235)',
              transition: 'border-color 0.2s ease',
              '&:hover': {
                'border-bottom': '2px solid rgb(37 99 235)',
              },
            },
            table: {
              width: '100%',
              'border-collapse': 'collapse',
              border: '1px solid rgb(228 228 231)',
            },
            'th,td': {
              border: '1px solid rgb(228 228 231)',
              padding: '0.75rem',
            },
            th: {
              'background-color': 'rgb(244 244 245)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
