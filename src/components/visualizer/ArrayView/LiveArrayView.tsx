import { useState, useEffect, useRef, useMemo } from 'react'
import { ArrayView } from './ArrayView'
import type { LiveArrayViewProps, ArrayViewPointer } from './types'

// Hook to detect changes in the array
function useArrayDiff(currentData: any[]) {
    const prevDataRef = useRef<any[]>([])
    const isFirstRenderRef = useRef(true)

    const diff = useMemo(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false
            return { changes: [], deletions: [] }
        }

        const prevData = prevDataRef.current
        const changes: number[] = []

        // Simple diff: check indices. 
        // If length changed, we might have shifts, but for visualization 
        // we often just want to know which specific indices have new values 
        // or if the array grew.

        const len = Math.max(currentData.length, prevData.length)

        for (let i = 0; i < len; i++) {
            if (i < currentData.length && i < prevData.length) {
                if (currentData[i] !== prevData[i]) {
                    changes.push(i)
                }
            } else if (i < currentData.length) {
                // New element added
                changes.push(i)
            }
            // We don't track "deletions" by index for highlighting usually, 
            // unless we want to show a "gap". But ArrayView renders current data.
            // So "deletingIndices" is more for "about to be deleted".
        }

        return { changes }
    }, [currentData])

    useEffect(() => {
        prevDataRef.current = [...currentData]
    }, [currentData])

    return diff
}

export function LiveArrayView({
    data,
    title,
    className,
    pointers = [],
    highlightDuration = 500,
    // Additional props for convenience
    curIndex,
    activeIndices: externalActiveIndices = [],
    highlightIndices: externalHighlightIndices = [],
}: LiveArrayViewProps & {
    curIndex?: number
    activeIndices?: number[]
    highlightIndices?: number[]
}) {
    const [highlightingIndices, setHighlightingIndices] = useState<Set<number>>(new Set())
    const timersRef = useRef<number[]>([])

    const { changes } = useArrayDiff(data)

    useEffect(() => {
        if (changes.length === 0) return

        setHighlightingIndices(prev => {
            const next = new Set(prev)
            changes.forEach(index => next.add(index))
            return next
        })

        const timer = setTimeout(() => {
            setHighlightingIndices(prev => {
                const next = new Set(prev)
                changes.forEach(index => next.delete(index))
                return next
            })
        }, highlightDuration)

        timersRef.current.push(timer)
    }, [changes, highlightDuration])

    useEffect(() => {
        return () => {
            timersRef.current.forEach(timer => clearTimeout(timer))
            timersRef.current = []
        }
    }, [])

    // Merge pointers
    const mergedPointers = useMemo(() => {
        const list = [...pointers]
        if (typeof curIndex === 'number' && curIndex >= 0 && curIndex < data.length) {
            // Check if there's already a pointer at this index to stack/style
            // The ArrayView handles stacking visually, but we can add a label
            list.push({
                index: curIndex,
                label: 'cur',
                color: '#ef4444', // red-500
                slot: 0
            })
        }
        return list
    }, [pointers, curIndex, data.length])

    // Merge highlights
    const mergedHighlights = useMemo(() => {
        const list = [...externalHighlightIndices]
        highlightingIndices.forEach(idx => {
            if (!list.includes(idx)) list.push(idx)
        })
        return list
    }, [externalHighlightIndices, highlightingIndices])

    return (
        <ArrayView
            data={data}
            title={title}
            className={className}
            pointers={mergedPointers}
            highlightIndices={mergedHighlights}
            activeIndices={externalActiveIndices}
        />
    )
}
