import { useState } from 'react'
import { SmartMapVisualizer } from './SmartMapVisualizer'
import { type MapItem } from './MapVisualizer'
import { Plus, RefreshCw, Trash2, Minus } from 'lucide-react'

export function MapDemo() {
  const [mapData, setMapData] = useState<MapItem[]>([
    { key: 'a', value: 1 },
    { key: 'b', value: 2 },
    { key: 'target', value: 9 }
  ])
  
  const addRandomItem = () => {
    const key = String.fromCharCode(97 + Math.floor(Math.random() * 26)) // a-z
    const value = Math.floor(Math.random() * 100)
    
    setMapData(prev => {
      const exists = prev.find(item => item.key === key)
      if (exists) {
        return prev.map(item => item.key === key ? { ...item, value } : item)
      }
      return [...prev, { key, value }]
    })
  }

  const removeRandomItem = () => {
    if (mapData.length === 0) return
    const randomIndex = Math.floor(Math.random() * mapData.length)
    const itemToRemove = mapData[randomIndex]
    
    setMapData(prev => prev.filter(item => item.key !== itemToRemove.key))
  }

  const clearMap = () => {
    setMapData([])
  }

  const resetDemo = () => {
    setMapData([
      { key: 'nums[0]', value: 2 },
      { key: 'nums[1]', value: 7 },
      { key: 'nums[2]', value: 11 },
      { key: 'nums[3]', value: 15 }
    ])
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Smart Map Component Demo</h2>
        <div className="flex gap-2">
          <button 
            onClick={addRandomItem}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
          <button 
            onClick={removeRandomItem}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            <Minus className="w-4 h-4" /> Remove Item
          </button>
          <button 
            onClick={resetDemo}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
          <button 
            onClick={clearMap}
            className="inline-flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>
      </div>

      <SmartMapVisualizer 
        data={mapData} 
        title="Hash Map State (Auto Highlight)" 
        className="min-h-[200px]"
        highlightDuration={1500}
      />
      
      <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
        <p>提示：点击 "Add Item" 自动高亮变更；点击 "Remove Item" 随机删除一项。</p>
      </div>
    </div>
  )
}
