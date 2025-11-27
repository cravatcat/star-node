import { cn } from "@/lib/utils"
import type { ArrayViewProps, ArrayViewPointer } from "./types"

export function ArrayView({
    data,
    title = "Array View",
    className,
    pointers = [],
    highlightIndices = [],
    activeIndices = [],
    deletingIndices = []
}: ArrayViewProps) {

    // Ensure data is an array
    const items = Array.isArray(data) ? data : []

    return (
        <div className={cn("w-full font-mono text-sm", className)}>
            {title && (
                <div className="mb-6 flex items-center justify-between text-muted-foreground px-1">
                    <span className="font-semibold">{title}</span>
                    <span className="text-xs">length: {items.length}</span>
                </div>
            )}

            <div className="flex flex-wrap gap-2 p-4 pt-8 rounded-lg shadow-sm bg-card min-h-[120px] items-center">
                {items.length === 0 ? (
                    <span className="text-muted-foreground/50 italic select-none">// empty</span>
                ) : (
                    items.map((value, index) => {
                        const isHighlighted = highlightIndices.includes(index)
                        const isActive = activeIndices.includes(index)
                        const isDeleting = deletingIndices.includes(index)

                        // Get pointers for this index
                        const currentPointers = pointers.filter(p => p.index === index)

                        return (
                            <div key={index} className="relative flex flex-col items-center group">
                                {/* Pointers Area */}
                                <div className="absolute -top-6 w-full h-6 flex justify-center items-end pointer-events-none">
                                    {currentPointers.length > 1 ? (
                                        <GroupedPointerIndicator pointers={currentPointers} />
                                    ) : (
                                        currentPointers.map((pointer, i) => (
                                            <PointerIndicator key={i} pointer={pointer} />
                                        ))
                                    )}
                                </div>

                                {/* Array Element */}
                                <div
                                    className={cn(
                                        "relative flex items-center justify-center min-w-[3rem] h-12 px-3 rounded-md border-2 transition-all duration-300",
                                        // Base style
                                        "bg-background border-muted",
                                        // States
                                        isActive && "border-primary bg-primary/5 scale-110 z-10 shadow-md",
                                        isHighlighted && !isActive && "border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20",
                                        isDeleting && "border-red-400 bg-red-50 dark:bg-red-900/20 opacity-50 scale-90",
                                        !isActive && !isHighlighted && !isDeleting && "hover:border-muted-foreground/50"
                                    )}
                                >
                                    <span className={cn(
                                        "text-base font-medium transition-colors",
                                        isActive && "text-primary font-bold",
                                        isDeleting && "text-red-500 line-through decoration-2"
                                    )}>
                                        {String(value)}
                                    </span>

                                    {/* Index Label */}
                                    <div className="absolute -bottom-5 text-[10px] text-muted-foreground/60 font-sans">
                                        {index}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

function GroupedPointerIndicator({ pointers }: { pointers: ArrayViewPointer[] }) {
    // Sort pointers if needed, or keep order.
    // We will render a single container with all labels inline or stacked compactly.
    // For simplicity, let's render them horizontally in a pill.
    
    return (
        <div className="absolute flex flex-col items-center transition-all duration-300 -translate-y-1">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-background/90 backdrop-blur-sm shadow-sm border border-border/50 z-20 mb-0.5">
                    {pointers.map((pointer, i) => (
                        <span
                            key={i}
                            className="text-[10px] font-bold whitespace-nowrap"
                            style={{ color: pointer.color }}
                        >
                            {pointer.label}
                            {i < pointers.length - 1 && <span className="text-muted-foreground/50 ml-1">,</span>}
                        </span>
                    ))}
                </div>
                
                {/* Unified connection line/dot */}
                <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full shadow-sm z-10 bg-foreground/20" />
                    <div className="w-0.5 h-2 bg-foreground/20" />
                </div>
            </div>
        </div>
    )
}

function PointerIndicator({ pointer }: { pointer: ArrayViewPointer }) {
    // Determine vertical offset based on slot or default stacking
    // If slot is provided, use it. Otherwise, we might need logic to stack them if multiple pointers are on the same index without slots.
    // For simplicity here, we'll just render them. If multiple pointers are on the same index, they might overlap if not slotted.
    // The user requirement says "max 3 pointers", "different style if 3 pointers on same element".
    // Let's use absolute positioning with transforms for slots.

    const slot = pointer.slot ?? 0
    // Increase vertical spacing between stacked pointers
    const translateY = -slot * 24 // Stack upwards more aggressively to clear labels

    return (
        <div
            className="absolute flex flex-col items-center transition-all duration-300"
            style={{ transform: `translateY(${translateY}px)` }}
        >
            <div className="flex flex-col items-center">
                {pointer.label && (
                    <span
                        className="text-[10px] font-bold mb-0.5 px-1 rounded bg-background/80 backdrop-blur-sm shadow-sm border border-border/50 whitespace-nowrap z-20"
                        style={{ color: pointer.color }}
                    >
                        {pointer.label}
                    </span>
                )}
                <div
                    className="w-2 h-2 rounded-full shadow-sm z-10"
                    style={{ backgroundColor: pointer.color || 'currentColor' }}
                />
                <div
                    className="w-0.5 h-2"
                    style={{ backgroundColor: pointer.color || 'currentColor', opacity: 0.5 }}
                />
            </div>
        </div>
    )
}
