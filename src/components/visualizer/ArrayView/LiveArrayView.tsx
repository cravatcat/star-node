import { useState, useEffect, useRef, useMemo } from 'react'
import { ArrayView } from './ArrayView'
import type { LiveArrayViewProps, ArrayViewPointer, TrackedItem } from './types'

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

    // Use the smart diff hook
    // We need to implement the hook logic inside here or use the custom hook.
    // Let's inline the improved logic for simplicity and state access.
    
    const [items, setItems] = useState<TrackedItem[]>([])
    // Initial load
    useEffect(() => {
        if (items.length === 0 && data.length > 0) {
             setItems(data.map((v, i) => ({ id: `init-${i}-${Date.now()}`, value: v })))
        }
    }, [])

    // Real diff logic
    const prevDataRef = useRef<any[]>([])
    const isFirstRenderRef = useRef(true)
    const nextIdRef = useRef(0)
    
    // We need to run this diff whenever `data` changes.
    useEffect(() => {
         if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false
            setItems(data.map((v) => ({ id: `item-${nextIdRef.current++}`, value: v })))
            prevDataRef.current = [...data]
            return
        }

        const prevData = prevDataRef.current
        
        setItems(prevItems => {
            const newItems: TrackedItem[] = []
            const newChanges: number[] = []
            
            // prevItems corresponds to prevData
            
            let start = 0
            let endOld = prevData.length - 1
            let endNew = data.length - 1
    
            // Match head
            while (start <= endOld && start <= endNew && prevData[start] === data[start]) {
                start++
            }
    
            // Match tail
            while (endOld >= start && endNew >= start && prevData[endOld] === data[endNew]) {
                endOld--
                endNew--
            }
    
            // 1. Head (Unchanged)
            for (let i = 0; i < start; i++) {
                newItems.push(prevItems[i])
            }
    
            // 2. Middle (Changed/New)
            for (let i = start; i <= endNew; i++) {
                newItems.push({
                    id: `item-${nextIdRef.current++}`,
                    value: data[i]
                })
                newChanges.push(i)
            }
    
            // 3. Tail (Unchanged)
            // The tail in prevItems starts at `endOld + 1`
            const oldTailStart = endOld + 1
            const oldTailLength = prevData.length - oldTailStart
            
            for (let i = 0; i < oldTailLength; i++) {
                newItems.push(prevItems[oldTailStart + i])
            }
            
            // Trigger highlights
            if (newChanges.length > 0) {
                 // We need to set highlighting indices. 
                 // Cannot call setHighlightingIndices directly in this reducer-like function easily without causing issues?
                 // Actually we can, but let's schedule it.
                 setTimeout(() => {
                    setHighlightingIndices(prev => {
                        const next = new Set(prev)
                        newChanges.forEach(index => next.add(index))
                        return next
                    })
                    
                    const timer = setTimeout(() => {
                        setHighlightingIndices(prev => {
                            const next = new Set(prev)
                            newChanges.forEach(index => next.delete(index))
                            return next
                        })
                    }, highlightDuration)
                    timersRef.current.push(timer)
                 }, 0)
            }

            prevDataRef.current = [...data]
            return newItems
        })

    }, [data, highlightDuration])


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

        // Post-process to assign slots for overlapping pointers to avoid visual merging
        const pointersByIndex = new Map<number, ArrayViewPointer[]>()
        list.forEach(p => {
            const idx = p.index
            if (!pointersByIndex.has(idx)) {
                pointersByIndex.set(idx, [])
            }
            pointersByIndex.get(idx)!.push(p)
        })

        const result: ArrayViewPointer[] = []
        pointersByIndex.forEach((group) => {
            group.forEach((p, i) => {
                // Assign slot based on index in the group to stack them vertically
                // Preserving existing props, just overriding slot
                result.push({
                    ...p,
                    slot: i
                })
            })
        })

        return result
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
            data={items} // Pass tracked items with IDs
            title={title}
            className={className}
            pointers={mergedPointers}
            highlightIndices={mergedHighlights}
            activeIndices={externalActiveIndices}
        />
    )
}
