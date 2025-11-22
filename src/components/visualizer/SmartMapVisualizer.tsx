import { useState, useEffect, useRef } from 'react'
import { MapVisualizer, type MapItem } from './MapVisualizer'

interface SmartMapVisualizerProps {
  data: MapItem[] | Map<string | number, string | number>
  title?: string
  className?: string
  highlightDuration?: number
  externalHighlightKeys?: (string | number)[]
}

export function SmartMapVisualizer({
  data,
  title,
  className,
  highlightDuration = 1000,
  externalHighlightKeys = []
}: SmartMapVisualizerProps) {
  // 显示列表，包含正常数据和正在执行删除动画的数据
  const [displayData, setDisplayData] = useState<MapItem[]>([])
  // 正在高亮（新增/修改）的 keys
  const [autoHighlightKeys, setAutoHighlightKeys] = useState<(string | number)[]>([])
  // 正在删除的 keys
  const [deletingKeys, setDeletingKeys] = useState<(string | number)[]>([])
  
  // 使用 ref 存储上一次的 data 转换后的 Map，用于对比
  const prevDataMapRef = useRef<Map<string | number, string | number>>(new Map())
  // 存储正在删除的项，避免在 data 更新时丢失
  const deletingItemsRef = useRef<Map<string | number, MapItem>>(new Map())

  useEffect(() => {
    // 1. 将传入的 data 转为 Map 和 Array
    const nextDataMap = data instanceof Map 
      ? data 
      : new Map(data.map(item => [item.key, item.value]))
    
    const nextDataArray = Array.from(nextDataMap.entries()).map(([key, value]) => ({ key, value }))

    const prevDataMap = prevDataMapRef.current
    const changes: (string | number)[] = []
    const newDeletions: (string | number)[] = []

    // 2. 检测新增和修改
    for (const [key, value] of nextDataMap.entries()) {
      const prevValue = prevDataMap.get(key)
      // 如果之前不存在(新增) 或 值不相等(修改)
      if (!prevDataMap.has(key) || prevValue !== value) {
        changes.push(key)
      }
    }

    // 3. 检测删除
    for (const key of prevDataMap.keys()) {
      if (!nextDataMap.has(key)) {
        newDeletions.push(key)
        // 保存被删除项的最后状态
        deletingItemsRef.current.set(key, { 
          key, 
          value: prevDataMap.get(key)! 
        })
      }
    }

    // 4. 更新高亮状态
    if (changes.length > 0) {
      setAutoHighlightKeys(prev => [...prev, ...changes])
      setTimeout(() => {
        setAutoHighlightKeys(prev => prev.filter(k => !changes.includes(k)))
      }, highlightDuration)
    }

    // 5. 更新删除状态
    if (newDeletions.length > 0) {
      setDeletingKeys(prev => [...prev, ...newDeletions])
      // 动画结束后清理
      setTimeout(() => {
        setDeletingKeys(prev => prev.filter(k => !newDeletions.includes(k)))
        newDeletions.forEach(k => deletingItemsRef.current.delete(k))
        // 强制刷新 displayData 以移除已彻底删除的项
        // 注意：这里通过 setDisplayData 的回调来重新计算
        setDisplayData(current => current.filter(item => !newDeletions.includes(item.key)))
      }, 500) // 500ms 对应 CSS transition duration
    }

    // 6. 构建新的 displayData
    // 改进策略：基于上一帧的 displayData 来构建，以保持顺序稳定
    setDisplayData(prevDisplayData => {
      // 1. 创建一个 Set 用于快速查找新数据中的 keys
      const existingKeys = new Set<string | number>()
      
      const newDisplayList: MapItem[] = []

      // 2. 遍历旧列表，决定每一项是"更新"、"保留(正在删除)"还是"移除"
      for (const item of prevDisplayData) {
        // 如果新数据里有这个 key，说明是更新或未变
        if (nextDataMap.has(item.key)) {
          newDisplayList.push({ key: item.key, value: nextDataMap.get(item.key)! })
          existingKeys.add(item.key)
        }
        // 如果新数据里没有，但在 deletingItemsRef 里（说明正在删除动画中），保留它
        else if (deletingItemsRef.current.has(item.key)) {
          newDisplayList.push(deletingItemsRef.current.get(item.key)!)
        }
        // 否则，说明该项已彻底删除，不再添加到新列表
      }

      // 3. 追加新增加的项（在新数据中存在，但不在旧列表中处理过的）
      for (const item of nextDataArray) {
        if (!existingKeys.has(item.key)) {
          newDisplayList.push(item)
        }
      }

      return newDisplayList
    })

    // 更新 ref
    prevDataMapRef.current = nextDataMap

  }, [data, highlightDuration])

  const mergedHighlightKeys = Array.from(new Set([...autoHighlightKeys, ...externalHighlightKeys]))

  return (
    <MapVisualizer
      data={displayData}
      title={title}
      className={className}
      highlightKeys={mergedHighlightKeys}
      deletingKeys={deletingKeys}
    />
  )
}
