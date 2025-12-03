import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

export interface SidebarItem {
  id: string
  label: string
  href?: string
  title?: string // 鼠标悬停显示的完整标题
  items?: SidebarItem[] // 嵌套子菜单
}

interface SidebarProps {
  title?: string
  items: SidebarItem[]
  className?: string
}

function SidebarItemView({ item, depth = 0 }: { item: SidebarItem; depth?: number }) {
  const location = useLocation()
  const hasChildren = item.items && item.items.length > 0
  
  // 检查是否有子项被选中，如果有，则默认展开
  const isChildActive = (items: SidebarItem[]): boolean => {
    return items.some(child => {
      if (child.href && location.pathname === child.href) return true
      if (child.items) return isChildActive(child.items)
      return false
    })
  }

  const [isOpen, setIsOpen] = useState(() => {
    // 默认展开第一层，或者如果有子项被选中则展开
    return depth === 0 || (hasChildren && isChildActive(item.items!))
  })

  const isActive = item.href ? location.pathname === item.href : false

  // If it's a leaf node (link) or a group without children (behaves like link)
  if (!hasChildren) {
    return (
      <Link
        to={item.href || "#"}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start font-normal truncate",
            isActive && "font-medium"
          )}
          style={{ paddingLeft: `${(depth * 0.75) + 0.5}rem` }}
          title={item.title || item.label}
        >
          <span className="truncate">{item.label}</span>
        </Button>
      </Link>
    )
  }

  // If it's a group
  return (
    <div className="flex flex-col gap-1">
      <Button
        variant="ghost"
        className="w-full justify-between font-semibold hover:bg-transparent hover:text-primary px-2"
        style={{ paddingLeft: `${(depth * 0.75) + 0.5}rem` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{item.label}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
        )}
      </Button>
      {isOpen && (
        <div className="flex flex-col gap-1 border-l ml-4 border-border/50">
          {item.items!.map((child) => (
            <SidebarItemView key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar({ title = "目录", items, className }: SidebarProps) {
  return (
    <div className={className}>
      {title && (
        <h2 className="mb-4 text-lg font-semibold tracking-tight">{title}</h2>
      )}
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="flex flex-col gap-1 pr-4">
          {items.map((item) => (
            <SidebarItemView key={item.id} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
