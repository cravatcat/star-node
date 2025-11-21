import { useEffect, useState } from 'react'
import { cn, generateSlug } from '@/lib/utils'

interface TableOfContentsProps {
  content: string
}

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const lines = content.split('\n')
    const items: TocItem[] = []
    // Only match headers that are not inside code blocks
    let inCodeBlock = false

    lines.forEach((line) => {
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock
        return
      }

      if (inCodeBlock) return

      const match = line.match(/^(#{1,3})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        const text = match[2].trim()
        const id = generateSlug(text)
        items.push({ id, text, level })
      }
    })

    setHeadings(items)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">目录</p>
      <ul className="space-y-2 text-sm">
        {headings.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-muted-foreground hover:text-foreground transition-colors line-clamp-1",
                activeId === item.id && "text-foreground font-medium"
              )}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: 'smooth'
                })
                setActiveId(item.id)
              }}
              title={item.text}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
