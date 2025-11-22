import { useState } from 'react'
import { SmartMapVisualizer } from '@/components/visualizer/SmartMapVisualizer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  const [mapData, setMapData] = useState<Map<string, any>>(new Map<string, any>([
    ['apple', 5],
    ['banana', 3],
    ['orange', 8],
    ['config', { theme: 'dark', version: '1.0.0' }],
    ['metadata', new Map([
      ['author', 'John'],
      ['created', '2024']
    ])]
  ]))
  const [counter, setCounter] = useState(10)

  const addRandomItem = () => {
    const fruits = ['grape', 'mango', 'peach', 'pear', 'kiwi', 'melon', 'cherry', 'plum']
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)]
    const randomValue = Math.floor(Math.random() * 20) + 1
    
    setMapData(prev => {
      const next = new Map(prev)
      next.set(randomFruit, randomValue)
      return next
    })
  }

  const addNestedItem = () => {
    setMapData(prev => {
      const next = new Map(prev)
      next.set(`user_${counter}`, new Map<string, any>([
        ['id', counter],
        ['role', 'admin'],
        ['permissions', { read: true, write: false }]
      ]))
      return next
    })
    setCounter(c => c + 1)
  }

  const updateRandomItem = () => {
    const keys = Array.from(mapData.keys())
    if (keys.length === 0) return
    
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    const newValue = Math.floor(Math.random() * 20) + 1
    
    setMapData(prev => {
      const next = new Map(prev)
      // Only update if it's a number to avoid overwriting nested structures with numbers for this demo
      if (typeof prev.get(randomKey) === 'number') {
          next.set(randomKey, newValue)
      } else {
          // If it's complex, maybe update a property inside?
          // For simplicity, let's just skip or force update
          // Let's try to find a number key
          const numberKeys = keys.filter(k => typeof prev.get(k) === 'number')
          if (numberKeys.length > 0) {
             const k = numberKeys[Math.floor(Math.random() * numberKeys.length)]
             next.set(k, newValue)
          }
      }
      return next
    })
  }

  const deleteRandomItem = () => {
    const keys = Array.from(mapData.keys())
    if (keys.length === 0) return
    
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    
    setMapData(prev => {
      const next = new Map(prev)
      next.delete(randomKey)
      return next
    })
  }

  const resetMap = () => {
    setMapData(new Map([
      ['apple', 5],
      ['banana', 3],
      ['orange', 8]
    ]))
  }

  const incrementValue = () => {
    setCounter(prev => prev + 1)
    setMapData(prev => {
      const next = new Map(prev)
      next.set('counter', counter + 1)
      return next
    })
  }

  return (
    <div className="flex flex-col items-center gap-8 p-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Star Node</h1>
        <p className="text-muted-foreground">算法与数据结构可视化学习</p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>SmartMapVisualizer 交互演示</CardTitle>
          <CardDescription>
            实时追踪 Map 数据变化，自动高亮新增/修改项，动画展示删除过程
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button onClick={addRandomItem} variant="default">
              ➕ 添加随机项
            </Button>
            <Button onClick={addNestedItem} variant="default" className="bg-purple-600 hover:bg-purple-700 text-white">
              📦 添加嵌套项
            </Button>
            <Button onClick={updateRandomItem} variant="secondary">
              🔄 更新随机项
            </Button>
            <Button onClick={deleteRandomItem} variant="destructive">
              🗑️ 删除随机项
            </Button>
            <Button onClick={incrementValue} variant="outline">
              ⬆️ 计数器 +1
            </Button>
            <Button onClick={resetMap} variant="ghost">
              🔁 重置
            </Button>
          </div>

          <SmartMapVisualizer 
            data={mapData}
            title="水果库存 Map"
            highlightDuration={1500}
          />

          <div className="text-sm text-muted-foreground space-y-1 border-t pt-4">
            <p>💡 <strong>使用提示：</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>新增或修改的项会以<span className="text-indigo-600 font-semibold">蓝色高亮</span>显示</li>
              <li>删除的项会以<span className="text-red-600 font-semibold">红色删除线</span>淡出</li>
              <li>所有动画都是自动追踪的，无需手动控制</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}
