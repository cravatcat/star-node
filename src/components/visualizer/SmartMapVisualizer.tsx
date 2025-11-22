import { useState, useEffect, useRef, useMemo } from 'react'
import { MapVisualizer, type MapItem } from './MapVisualizer'

interface SmartMapVisualizerProps {
  data: MapItem[] | Map<string | number, string | number>
  title?: string
  className?: string
  highlightDuration?: number
  externalHighlightKeys?: (string | number)[]
}

function useMapDiff(currentMap: Map<string | number, string | number>) {
  const prevMapRef = useRef<Map<string | number, string | number>>(new Map())
  const isFirstRenderRef = useRef(true)
  
  const diff = useMemo(() => {
    // 首次渲染不计算差异
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return { changes: [], deletions: [] }
    }

    const prevMap = prevMapRef.current
    const changes: (string | number)[] = []
    const deletions: (string | number)[] = []

    // 检测新增和变更
    currentMap.forEach((value, key) => {
      if (!prevMap.has(key) || prevMap.get(key) !== value) {
        changes.push(key)
      }
    })
    
    // 检测删除
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

export function SmartMapVisualizer({
  data,
  title,
  className,
  highlightDuration = 1000,
  externalHighlightKeys = []
}: SmartMapVisualizerProps) {
  // === 状态定义 ===
  const [displayData, setDisplayData] = useState<MapItem[]>([])
  const [highlightingKeys, setHighlightingKeys] = useState<Set<string | number>>(new Set())
  const [deletingKeys, setDeletingKeys] = useState<Set<string | number>>(new Set())
  
  // 用于清理定时器，防止内存泄漏
  const timersRef = useRef<number[]>([])

  // 1. 数据标准化
  const nextDataMap = useMemo(() => {
    return data instanceof Map 
      ? data 
      : new Map(data.map(item => [item.key, item.value]))
  }, [data])

  // 2. 计算差异
  const { changes, deletions } = useMapDiff(nextDataMap)

  // === 副作用分离 ===

  // Effect 1: 处理高亮 (Highlighting)
  useEffect(() => {
    if (changes.length === 0) return

    // 添加高亮
    setHighlightingKeys(prev => {
      const next = new Set(prev)
      changes.forEach(key => next.add(key))
      return next
    })
    
    // 定时移除高亮
    const timer = setTimeout(() => {
      setHighlightingKeys(prev => {
        const next = new Set(prev)
        changes.forEach(key => next.delete(key))
        return next
      })
    }, highlightDuration)
    
    timersRef.current.push(timer)
  }, [changes, highlightDuration])

  // Effect 2: 处理删除动画 (Deleting Animation)
  useEffect(() => {
    if (deletions.length === 0) return

    // 标记为正在删除
    setDeletingKeys(prev => {
      const next = new Set(prev)
      deletions.forEach(key => next.add(key))
      return next
    })

    // 延迟后移除删除标记并更新显示数据
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

  // Effect 3: 同步显示数据 (Data Sync)
  useEffect(() => {
    setDisplayData(prevList => {
      const newList: MapItem[] = []
      const processedKeys = new Set<string | number>()

      // A. 保留现有项（更新值或保留删除中的项）
      prevList.forEach(item => {
        if (nextDataMap.has(item.key)) {
          // 更新现有项的值
          newList.push({ key: item.key, value: nextDataMap.get(item.key)! })
          processedKeys.add(item.key)
        } else if (deletions.includes(item.key) || deletingKeys.has(item.key)) {
          // 保留正在删除的项（用于动画）
          newList.push(item)
          processedKeys.add(item.key)
        }
      })

      // B. 添加新项
      nextDataMap.forEach((value, key) => {
        if (!processedKeys.has(key)) {
          newList.push({ key, value })
        }
      })
      
      return newList
    })
  }, [nextDataMap, deletions, deletingKeys]) 

  // 4. 合并高亮 Keys
  const mergedHighlightKeys = useMemo(() => {
    const merged = new Set(highlightingKeys)
    externalHighlightKeys.forEach(key => merged.add(key))
    return Array.from(merged)
  }, [highlightingKeys, externalHighlightKeys])
  
  // 5. 清理定时器（防止内存泄漏）
  useEffect(() => {
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer))
      timersRef.current = []
    }
  }, [])

  return (
    <MapVisualizer
      data={displayData}
      title={title}
      className={className}
      highlightKeys={mergedHighlightKeys}
      deletingKeys={Array.from(deletingKeys)}
    />
  )
}
