import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export interface SidebarItem {
  id: string
  label: string
  href: string
  title?: string // 鼠标悬停显示的完整标题
}

interface SidebarProps {
  title?: string
  items: SidebarItem[]
  className?: string
}

export function Sidebar({ title = "目录", items, className }: SidebarProps) {
  const location = useLocation()

  return (
    <div className={className}>
      {title && (
        <h2 className="mb-4 text-lg font-semibold tracking-tight">{title}</h2>
      )}
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="flex flex-col gap-1 pr-4">
          {items.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link 
                key={item.id} 
                to={item.href}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start font-normal truncate",
                    isActive && "font-medium"
                  )}
                  title={item.title || item.label}
                >
                  <span className="truncate">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
