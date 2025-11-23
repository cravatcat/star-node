import { useState, useEffect, useRef, useMemo } from 'react'
import { MapView } from './MapView'
import type { MapItem, LiveMapViewProps } from './types'

function useMapDiff(currentMap: Map<string | number, any>) {
  const prevMapRef = useRef<Map<string | number, any>>(new Map())
  const isFirstRenderRef = useRef(true)

  const diff = useMemo(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return { changes: [], deletions: [] }
    }

    const prevMap = prevMapRef.current
    const changes: (string | number)[] = []
    const deletions: (string | number)[] = []

    currentMap.forEach((value, key) => {
      if (!prevMap.has(key) || prevMap.get(key) !== value) {
        changes.push(key)
      }
    })

    prevMap.forEach((_, key) => {
      if (!currentMap.has(key)) {
        deletions.push(key)
      }
    })

    return { changes, deletions }
  }, [currentMap])

  useEffect(() => {
    prevMapRef.current = new Map(currentMap)
  }, [currentMap])

  return diff
}

export function LiveMapView({
  data,
  title,
  className,
  highlightDuration = 1000,
  externalHighlightKeys = []
}: LiveMapViewProps) {
  const [displayData, setDisplayData] = useState<MapItem[]>([])
  const [highlightingKeys, setHighlightingKeys] = useState<Set<string | number>>(new Set())
  const [deletingKeys, setDeletingKeys] = useState<Set<string | number>>(new Set())

  const timersRef = useRef<number[]>([])

  const nextDataMap = useMemo(() => {
    return data instanceof Map
      ? data
      : new Map(data.map(item => [item.key, item.value]))
  }, [data])

  const { changes, deletions } = useMapDiff(nextDataMap)

  useEffect(() => {
    if (changes.length === 0) return

    setHighlightingKeys(prev => {
      const next = new Set(prev)
      changes.forEach(key => next.add(key))
      return next
    })

    const timer = setTimeout(() => {
      setHighlightingKeys(prev => {
        const next = new Set(prev)
        changes.forEach(key => next.delete(key))
        return next
      })
    }, highlightDuration)

    timersRef.current.push(timer)
  }, [changes, highlightDuration])

  useEffect(() => {
    if (deletions.length === 0) return

    setDeletingKeys(prev => {
      const next = new Set(prev)
      deletions.forEach(key => next.add(key))
      return next
    })

    const timer = setTimeout(() => {
      setDeletingKeys(prev => {
        const next = new Set(prev)
        deletions.forEach(key => next.delete(key))
        return next
      })
      setDisplayData(curr => curr.filter(item => !deletions.includes(item.key)))
    }, 500)

    timersRef.current.push(timer)
  }, [deletions])

  useEffect(() => {
    setDisplayData(prevList => {
      const newList: MapItem[] = []
      const processedKeys = new Set<string | number>()

      prevList.forEach(item => {
        if (nextDataMap.has(item.key)) {
          newList.push({ key: item.key, value: nextDataMap.get(item.key)! })
          processedKeys.add(item.key)
        } else if (deletions.includes(item.key) || deletingKeys.has(item.key)) {
          newList.push(item)
          processedKeys.add(item.key)
        }
      })

      nextDataMap.forEach((value, key) => {
        if (!processedKeys.has(key)) {
          newList.push({ key, value })
        }
      })

      return newList
    })
  }, [nextDataMap, deletions, deletingKeys])

  const mergedHighlightKeys = useMemo(() => {
    const merged = new Set(highlightingKeys)
    externalHighlightKeys.forEach(key => merged.add(key))
    return Array.from(merged)
  }, [highlightingKeys, externalHighlightKeys])

  useEffect(() => {
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer))
      timersRef.current = []
    }
  }, [])

  return (
    <MapView
      data={displayData}
      title={title}
      className={className}
      highlightKeys={mergedHighlightKeys}
      deletingKeys={Array.from(deletingKeys)}
    />
  )
}
