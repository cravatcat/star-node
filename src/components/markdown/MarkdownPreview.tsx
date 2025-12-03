import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import type { Components } from 'react-markdown'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import 'katex/dist/katex.min.css'

import { generateSlug } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface MarkdownPreviewProps {
  content: string
  className?: string
}

function CodeBlock({ language, children, ...props }: any) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    const text = String(children).replace(/\n$/, '')
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative group" style={{ margin: '1rem 0' }}>
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 p-1.5 rounded-md bg-white/80 text-gray-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-gray-900 border border-gray-200 z-10 cursor-pointer"
        title="Copy code"
      >
        {isCopied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
      </button>
      <SyntaxHighlighter
        style={oneLight as any}
        language={language}
        PreTag="div"
        showLineNumbers
        wrapLines={true}
        lineNumberStyle={{ color: '#9ca3af', paddingRight: '1em' }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  )
}

export function MarkdownPreview({ content, className = '' }: MarkdownPreviewProps) {
  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const isInline = !match

      if (isInline) {
        return (
          <code className="bg-gray-100 px-1.5 py-0.5 rounded-md font-mono text-sm text-gray-800" {...props}>
            {children}
          </code>
        )
      }

      const { ref, ...rest } = props

      return (
        <CodeBlock language={match[1]} {...rest}>
          {children}
        </CodeBlock>
      )
    },
    // 优化表格样式 - 使用 UI 组件
    table: ({ children }) => <Table>{children}</Table>,
    thead: ({ children }) => <TableHeader>{children}</TableHeader>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => <TableHead>{children}</TableHead>,
    td: ({ children }) => <TableCell>{children}</TableCell>,
    // 优化引用块样式
    blockquote({ children }) {
      return (
        <blockquote 
          className="border-l-4 border-gray-300 bg-gray-50 pl-4 pr-4 py-3 my-4 not-italic text-gray-800 rounded-r-md"
          style={{ quotes: 'none' }}
        >
          <div className="before:content-none after:content-none">
            {children}
          </div>
        </blockquote>
      )
    },
    // 优化标题样式
    h1({ children }) {
      const text = String(children)
      const id = generateSlug(text)
      // 去掉标题前面的 "x.x " 这种数字前缀
      const cleanText = text.replace(/^\d+(\.\d+)?\s+/, '')
      return <h1 id={id} className="text-3xl font-bold mt-6 mb-4 text-gray-900 scroll-mt-20">{cleanText}</h1>
    },
    h2({ children }) {
      const text = String(children)
      const id = generateSlug(text)
      return <h2 id={id} className="text-2xl font-bold mt-5 mb-3 text-gray-900 scroll-mt-20">{children}</h2>
    },
    h3({ children }) {
      const text = String(children)
      const id = generateSlug(text)
      return <h3 id={id} className="text-xl font-semibold mt-4 mb-2 text-gray-900 scroll-mt-20">{children}</h3>
    },
  }

  return (
        // <div className={`prose prose-slate max-w-none prose-code:before:content-none prose-code:after:content-none prose-blockquote:not-italic prose-blockquote:font-normal ${showQuotationMarks ? '' : 'prose-blockquote:before:content-none prose-blockquote:after:content-none'} ${className}`}>

    <div className={`prose prose-slate max-w-none prose-code:before:content-none prose-code:after:content-none ${className}`}>
      <ReactMarkdown 
        components={components}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
