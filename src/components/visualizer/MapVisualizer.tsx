import { cn } from "@/lib/utils"

export interface MapItem {
  key: string | number
  value: string | number
}

interface MapVisualizerProps {
  data: MapItem[] | Map<string | number, string | number>
  title?: string
  className?: string
  highlightKeys?: (string | number)[]
}

export function MapVisualizer({ 
  data, 
  title = "Map Visualization", 
  className,
  highlightKeys = []
}: MapVisualizerProps) {
  // 统一数据格式为数组
  const items: MapItem[] = data instanceof Map 
    ? Array.from(data.entries()).map(([key, value]) => ({ key, value }))
    : data

  return (
    <div className={cn("w-full font-mono text-sm", className)}>
      {title && (
        <div className="mb-2 flex items-center justify-between text-muted-foreground px-1">
          <span className="font-semibold">{title}</span>
          <span className="text-xs">size: {items.length}</span>
        </div>
      )}
      
      <div className="rounded-lg p-4 shadow-sm">
        <div className="text-muted-foreground select-none">Map {'{'}</div>
        
        <div className="flex flex-col gap-1 pl-4 my-2">
          {items.length === 0 ? (
            <span className="text-muted-foreground/50 italic select-none">// empty</span>
          ) : (
            items.map((item, index) => {
              const isHighlighted = highlightKeys.includes(item.key)
              
              return (
                <div 
                  key={`${item.key}-${index}`}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 transition-all duration-500",
                    isHighlighted 
                      ? "bg-indigo-50 dark:bg-indigo-900/20" 
                      : "hover:bg-muted/40"
                  )}
                >
                  {/* Key */}
                  <span className={cn(
                    "min-w-[2rem] text-purple-600 dark:text-purple-400",
                    isHighlighted && "font-bold scale-105 transition-transform origin-left"
                  )}>
                    {typeof item.key === 'string' ? `"${item.key}"` : item.key}
                  </span>
                  
                  <span className="text-muted-foreground/60 select-none">{'=>'}</span>
                  
                  {/* Value */}
                  <span className={cn(
                    "text-emerald-600 dark:text-emerald-400",
                    isHighlighted && "font-bold scale-105 transition-transform origin-left"
                  )}>
                    {item.value}
                  </span>
                  
                  <span className="text-muted-foreground/40 select-none">,</span>
                </div>
              )
            })
          )}
        </div>
        
        <div className="text-muted-foreground select-none">{'}'}</div>
      </div>
    </div>
  )
}
