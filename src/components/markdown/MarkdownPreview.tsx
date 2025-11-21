import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Components } from 'react-markdown'

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export function MarkdownPreview({ content, className = '' }: MarkdownPreviewProps) {
  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const isInline = !match

      if (isInline) {
        return (
          <code className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm" {...props}>
            {children}
          </code>
        )
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ref, ...rest } = props

      return (
        <SyntaxHighlighter
          style={vscDarkPlus as any}
          language={match[1]}
          PreTag="div"
          className="rounded-md !my-4"
          {...rest}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      )
    }
  }

  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
