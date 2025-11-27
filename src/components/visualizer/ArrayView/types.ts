export interface ArrayItem {
    value: any
    index: number
}

export interface ArrayViewPointer {
    index: number
    label?: string
    color?: string
    slot?: number // Which vertical slot the pointer occupies (0 is closest to element)
}

export interface ArrayViewProps {
    data: any[]
    title?: string
    className?: string
    pointers?: ArrayViewPointer[]
    highlightIndices?: number[]
    activeIndices?: number[]
    deletingIndices?: number[]
    // If data items are objects with IDs, we can use them.
    // Or we can pass an optional key extractor or pre-calculated keys.
    // For now, let's allow data to be an array of objects that might have an id.
}

export interface LiveArrayViewProps {
    data: any[]
    title?: string
    className?: string
    pointers?: ArrayViewPointer[]
    highlightDuration?: number
}

// Internal type for stable ID tracking
export interface TrackedItem {
    id: string
    value: any
}
