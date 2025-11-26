export interface ArrayItem {
    value: any
    index: number
}

export interface ArrayViewPointer {
    index: number
    label?: string
    color?: string
    slot?: 0 | 1 | 2 // Which vertical slot the pointer occupies (0 is closest to element)
}

export interface ArrayViewProps {
    data: any[]
    title?: string
    className?: string
    pointers?: ArrayViewPointer[]
    highlightIndices?: number[]
    activeIndices?: number[]
    deletingIndices?: number[]
}

export interface LiveArrayViewProps {
    data: any[]
    title?: string
    className?: string
    pointers?: ArrayViewPointer[]
    highlightDuration?: number
}
