import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { Components } from 'react-markdown'
import 'katex/dist/katex.min.css'

interface MarkdownPreviewProps {
  content: string
  className?: string
  showQuotationMarks?: boolean // 是否显示引用块的引号
}

export function MarkdownPreview({ content, className = '', showQuotationMarks = false }: MarkdownPreviewProps) {
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
        <div style={{ margin: '1rem 0' }}>
          <SyntaxHighlighter
            style={oneLight as any}
            language={match[1]}
            PreTag="div"
            showLineNumbers
            wrapLines={true}
            lineNumberStyle={{ color: '#9ca3af', paddingRight: '1em' }}
            {...rest}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      )
    },
    // 优化表格样式
    table({ children }) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
            {children}
          </table>
        </div>
      )
    },
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
      return <h1 className="text-3xl font-bold mt-6 mb-4 text-gray-900">{children}</h1>
    },
    h2({ children }) {
      return <h2 className="text-2xl font-bold mt-5 mb-3 text-gray-900">{children}</h2>
    },
    h3({ children }) {
      return <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">{children}</h3>
    },
  }

  return (
    <div className={`prose prose-slate max-w-none prose-code:before:content-none prose-code:after:content-none prose-blockquote:not-italic prose-blockquote:font-normal ${showQuotationMarks ? '' : 'prose-blockquote:before:content-none prose-blockquote:after:content-none'} ${className}`}>
      <ReactMarkdown 
        components={components}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
