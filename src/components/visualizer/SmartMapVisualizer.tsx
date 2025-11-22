import { useState, useEffect } from 'react'
import { MapVisualizer, type MapItem } from './MapVisualizer'

interface SmartMapVisualizerProps {
  /**
   * 原始数据，可以是 MapVisualizer 支持的 MapItem[] 或 Map
   * 当此数据发生变化（引用变化）时，组件会自动检测变更并触发高亮
   */
  data: MapItem[] | Map<string | number, string | number>
  
  /**
   * 标题
   */
  title?: string
  
  /**
   * 自定义类名
   */
  className?: string
  
  /**
   * 高亮持续时间（毫秒），默认 1000ms
   */
  highlightDuration?: number
  
  /**
   * 可选：如果你仍想手动强制高亮某些 key，可以通过此 props 传入
   * 这些 key 会与自动检测到的变更 key 合并
   */
  externalHighlightKeys?: (string | number)[]
}

export function SmartMapVisualizer({
  data,
  title,
  className,
  highlightDuration = 1000,
  externalHighlightKeys = []
}: SmartMapVisualizerProps) {
  const [autoHighlightKeys, setAutoHighlightKeys] = useState<(string | number)[]>([])
  const [prevDataMap, setPrevDataMap] = useState<Map<string | number, string | number>>(new Map())

  // 将输入数据统一转为 Map 方便比对
  const currentDataMap = data instanceof Map 
    ? data 
    : new Map(data.map(item => [item.key, item.value]))

  useEffect(() => {
    // 检测变更的 Keys
    const changedKeys: (string | number)[] = []

    // 1. 检查新增或修改的项
    for (const [key, value] of currentDataMap.entries()) {
      const prevValue = prevDataMap.get(key)
      // 如果之前不存在，或者值发生了变化，标记为变更
      if (!prevDataMap.has(key) || prevValue !== value) {
        changedKeys.push(key)
      }
    }

    // 2. (可选) 检查被删除的项？
    // 对于可视化来说，已删除的项已经不在列表里了，无法高亮。
    // 如果需要展示"删除动画"，通常需要更复杂的 diff 逻辑保留删除项一小段时间。
    // 这里暂不处理删除的高亮。

    if (changedKeys.length > 0) {
      setAutoHighlightKeys(changedKeys)
      
      // 设置定时器清除高亮
      const timer = setTimeout(() => {
        setAutoHighlightKeys([])
      }, highlightDuration)
      
      // 更新前一次的数据状态，以便下一次比对
      setPrevDataMap(new Map(currentDataMap))

      return () => clearTimeout(timer)
    } else {
      // 如果只是引用变了但内容没变，或者初次渲染，也需要更新 prevDataMap
      // 这样能保证基准是最新的
      setPrevDataMap(new Map(currentDataMap))
    }
  }, [data]) // 当外部传入的 data 发生变化时触发

  // 合并自动高亮和外部强制高亮的 keys
  // 使用 Set 去重
  const mergedHighlightKeys = Array.from(new Set([...autoHighlightKeys, ...externalHighlightKeys]))

  return (
    <MapVisualizer
      data={data}
      title={title}
      className={className}
      highlightKeys={mergedHighlightKeys}
    />
  )
}
