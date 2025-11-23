import { useState } from 'react'
import { LiveMapView } from '@/components/visualizer/MapView'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function MapDisplay() {
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
      if (typeof prev.get(randomKey) === 'number') {
          next.set(randomKey, newValue)
      } else {
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
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Map Visualization</h1>
        <p className="text-muted-foreground mt-2">
          Interactive playground to visualize and manipulate Map data structures.
        </p>
      </div>

      <Card className="w-full border-none shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Interactive Demo</CardTitle>
          <CardDescription>
            Real-time tracking of Map data changes with auto-highlighting and deletion animations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          <div className="flex flex-wrap gap-2">
            <Button onClick={addRandomItem} variant="default" size="sm">
              ➕ Add Random
            </Button>
            <Button onClick={addNestedItem} variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              📦 Add Nested
            </Button>
            <Button onClick={updateRandomItem} variant="secondary" size="sm">
              🔄 Update
            </Button>
            <Button onClick={deleteRandomItem} variant="destructive" size="sm">
              🗑️ Delete
            </Button>
            <Button onClick={incrementValue} variant="outline" size="sm">
              ⬆️ Counter +1
            </Button>
            <Button onClick={resetMap} variant="ghost" size="sm">
              🔁 Reset
            </Button>
          </div>

          <LiveMapView 
            data={mapData}
            title="Inventory Map"
            highlightDuration={1500}
          />

          <div className="text-sm text-muted-foreground space-y-1 border-t pt-4">
            <p>💡 <strong>Tips:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>New/Modified items highlight in <span className="text-indigo-600 font-semibold">Blue</span></li>
              <li>Deleted items fade out with <span className="text-red-600 font-semibold">Red Strike-through</span></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
