import { Navigate, Route, Routes, useParams } from "react-router-dom"
import { MarkdownPreview } from "@/components/markdown/MarkdownPreview"
import { TableOfContents } from "@/components/TableOfContents"
import { DocLayout } from "@/layouts/DocLayout"
import { Sidebar, type SidebarItem } from "@/components/Sidebar"
import { useUpdateLastVisited, getLastVisited } from "@/hooks/useLastVisited"

// 1. Import all markdown files
const modules = import.meta.glob('@/reactNote/**/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
}) as Record<string, string>

// 2. Process modules into a structure
interface DocItem {
  path: string
  title: string
  content: string
}

const docs: Record<string, DocItem> = {}
const sidebarStructure: SidebarItem[] = []

// Filter out these specific files from the sidebar
const IGNORED_FILES = [
  "index",
  "01-基础与组件系统",
  "02-Hooks深度解析",
  "03-自定义Hooks试炼",
  "04-路由与状态管理",
  "05-React原理篇",
  "06-React性能优化"
]

// Helper to strip prefix
const stripPrefix = (s: string) => s.replace(/^\d+(\.\d+)?[-_]/, '')

// Helper to build tree
const addToTree = (items: SidebarItem[], parts: string[], fullPath: string, title: string) => {
  const part = parts[0]
  const isLeaf = parts.length === 1

  // If this part matches any ignored file name, skip it entirely
  // This handles both file leaves and directory names if they matched (though less likely for dirs)
  if (IGNORED_FILES.includes(part)) {
      return
  }

  if (isLeaf) {
    items.push({
      id: fullPath,
      label: stripPrefix(title), // Strip prefix for display
      originalLabel: title,      // Keep original for sorting
      href: `/reactbook/${fullPath}`,
      title: title
    })
    return
  }

  // Find group by id (which stores the original directory name)
  let group = items.find(i => i.id === part)
  if (!group) {
    group = {
      id: part,
      label: stripPrefix(part),
      originalLabel: part,
      items: []
    }
    items.push(group)
  }
  
  addToTree(group.items!, parts.slice(1), fullPath, title)
}

Object.keys(modules).forEach(path => {
  // Normalize path. keys are usually like "/src/reactNote/..."
  const match = path.match(/reactNote\/(.+)\.md$/)
  if (!match) return

  const relativePath = match[1] // e.g. "Hooks深度解析/4.1-useState"
  const parts = relativePath.split('/')
  const fileName = parts[parts.length - 1]

  // Store in docs map
  docs[relativePath] = {
    path: relativePath,
    title: fileName,
    content: modules[path]
  }

  // Add to sidebar tree
  addToTree(sidebarStructure, parts, relativePath, fileName)
})

// Sort sidebar items
const sortItems = (items: SidebarItem[]) => {
  items.sort((a, b) => {
     // Extract numbers if possible for sorting: "1.1-..." or "01-..."
     const getNum = (s: string) => {
       const m = s.match(/^(\d+(\.\d+)?)/)
       return m ? parseFloat(m[1]) : 9999
     }
     
     const labelA = a.originalLabel || a.label
     const labelB = b.originalLabel || b.label

     const numA = getNum(labelA)
     const numB = getNum(labelB)
     
     if (numA !== 9999 && numB !== 9999 && numA !== numB) {
       return numA - numB
     }
     
     return labelA.localeCompare(labelB, "zh-CN")
  })
  
  items.forEach(i => {
    if (i.items) sortItems(i.items)
  })
}
sortItems(sidebarStructure)


function ReactBookProblem() {
  const params = useParams()
  // Capture the wildcard part of the path
  const slug = params["*"]
  const doc = slug ? docs[slug] : null

  useUpdateLastVisited("last-visited-react", slug || "")

  if (!doc) {
     return (
      <DocLayout sidebar={<Sidebar title="React 笔记" items={sidebarStructure} />}>
        <div className="p-10">
           <h2 className="text-xl font-bold">文档未找到</h2>
           <p className="mt-4 text-gray-500">请求的路径: {slug}</p>
           <p className="mt-2 text-sm text-gray-400">请尝试点击左侧菜单。</p>
        </div>
      </DocLayout>
    )
  }

  return (
    <DocLayout
      sidebar={<Sidebar title="React 笔记" items={sidebarStructure} />}
      toc={<TableOfContents content={doc.content} />}
    >
      <MarkdownPreview content={doc.content} />
    </DocLayout>
  )
}

export default function ReactBookPage() {
  // Find first valid link for redirect
  const findFirstLink = (items: SidebarItem[]): string => {
    for (const item of items) {
      if (item.href) return item.href
      if (item.items) {
        const found = findFirstLink(item.items)
        if (found) return found
      }
    }
    return ""
  }

  const firstLink = findFirstLink(sidebarStructure)
  // Remove /reactbook/ prefix for relative navigation or storage
  const defaultSlug = firstLink.replace("/reactbook/", "")
  const lastVisited = getLastVisited("last-visited-react", defaultSlug)

  return (
    <Routes>
      <Route index element={<Navigate to={lastVisited || defaultSlug} replace />} />
      <Route path="*" element={<ReactBookProblem />} />
    </Routes>
  )
}
