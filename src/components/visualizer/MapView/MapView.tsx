import { cn } from "@/lib/utils"
import type { MapItem, MapViewProps } from "./types"

export function MapView({ 
  data, 
  title = "Map View", 
  className,
  highlightKeys = [],
  deletingKeys = [],
  isNested = false
}: MapViewProps) {
  // Standardize data format to array
  const items: MapItem[] = (() => {
    if (data instanceof Map) {
      return Array.from(data.entries()).map(([key, value]) => ({ key, value }))
    }
    if (Array.isArray(data)) {
      if (data.length > 0 && typeof data[0] === 'object' && data[0] !== null && 'key' in data[0] && 'value' in data[0]) {
        return data as MapItem[]
      }
      return data.map((value, index) => ({ key: index, value }))
    }
    if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([key, value]) => ({ key, value }))
    }
    return []
  })()

  if (isNested) {
    return (
      <div className={cn("w-full font-mono text-sm my-1", className)}>
        <span className="text-muted-foreground select-none">{"{"}</span>
        <div className="flex flex-col gap-1 pl-4 border-l-2 border-muted/20 ml-1">
          <MapContent 
            items={items} 
            highlightKeys={highlightKeys} 
            deletingKeys={deletingKeys} 
          />
        </div>
        <span className="text-muted-foreground select-none">{"}"}</span>
      </div>
    )
  }

  return (
    <div className={cn("w-full font-mono text-sm", className)}>
      {title && (
        <div className="mb-2 flex items-center justify-between text-muted-foreground px-1">
          <span className="font-semibold">{title}</span>
          <span className="text-xs">size: {items.length}</span>
        </div>
      )}
      
      <div className="rounded-lg p-4 shadow-sm bg-card">
        <div className="text-muted-foreground select-none">Map {'{'}</div>
        
        <div className="flex flex-col gap-1 pl-4 my-2">
          <MapContent 
            items={items} 
            highlightKeys={highlightKeys} 
            deletingKeys={deletingKeys} 
          />
        </div>
        
        <div className="text-muted-foreground select-none">{'}'}</div>
      </div>
    </div>
  )
}

function MapContent({ 
  items, 
  highlightKeys, 
  deletingKeys 
}: { 
  items: MapItem[], 
  highlightKeys: (string | number)[], 
  deletingKeys: (string | number)[] 
}) {
  if (items.length === 0) {
    return <span className="text-muted-foreground/50 italic select-none">// empty</span>
  }

  return (
    <>
      {items.map((item, index) => {
        const isHighlighted = highlightKeys.includes(item.key)
        const isDeleting = deletingKeys.includes(item.key)
        const isComplex = item.value instanceof Map || (typeof item.value === 'object' && item.value !== null)
        
        return (
          <div 
            key={`${item.key}-${index}`}
            className={cn(
              "flex flex-col gap-0.5 rounded-md px-2 py-1.5 transition-all duration-500",
              isDeleting 
                ? "bg-red-500/10 opacity-50 scale-95" 
                : isHighlighted 
                  ? "bg-indigo-50 dark:bg-indigo-900/20" 
                  : "hover:bg-muted/40"
            )}
          >
            <div className="flex items-center gap-2">
              {/* Key */}
              <span className={cn(
                "min-w-[2rem] text-purple-600 dark:text-purple-400 whitespace-nowrap",
                (isHighlighted || isDeleting) && "font-bold scale-105 transition-transform origin-left",
                isDeleting && "text-red-500 dark:text-red-400 line-through"
              )}>
                {typeof item.key === 'string' ? `"${item.key}"` : item.key}
              </span>
              
              <span className="text-muted-foreground/60 select-none">{'=>'}</span>
              
              {/* Value for Primitives */}
              {!isComplex && (
                <>
                  <span className={cn(
                    "text-emerald-600 dark:text-emerald-400 break-all",
                    (isHighlighted || isDeleting) && "font-bold scale-105 transition-transform origin-left",
                    isDeleting && "text-red-500 dark:text-red-400 line-through"
                  )}>
                    {String(item.value)}
                  </span>
                  <span className="text-muted-foreground/40 select-none">,</span>
                </>
              )}
            </div>

            {/* Value for Complex Types (Nested) */}
            {isComplex && (
              <div className="ml-2">
                <MapView 
                  data={item.value} 
                  isNested={true}
                  highlightKeys={[]} 
                  deletingKeys={[]}
                />
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
