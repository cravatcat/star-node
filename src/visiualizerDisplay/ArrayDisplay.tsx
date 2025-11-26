import { useState } from 'react'
import { LiveArrayView } from '@/components/visualizer/ArrayView/LiveArrayView'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { ArrayViewPointer } from '@/components/visualizer/ArrayView/types'

export function ArrayDisplay() {
  const [arrayData, setArrayData] = useState<number[]>([10, 20, 30, 40, 50])
  const [pointers, setPointers] = useState<ArrayViewPointer[]>([
    { index: 0, label: 'i', color: '#3b82f6' }, // blue-500
    { index: 4, label: 'j', color: '#10b981' }  // emerald-500
  ])
  const [activeIndices, setActiveIndices] = useState<number[]>([])

  const pushItem = () => {
    const newValue = Math.floor(Math.random() * 100)
    setArrayData(prev => [...prev, newValue])
  }

  const popItem = () => {
    setArrayData(prev => {
      if (prev.length === 0) return prev
      return prev.slice(0, -1)
    })
  }

  const insertAtRandom = () => {
    const newValue = Math.floor(Math.random() * 100)
    const index = Math.floor(Math.random() * (arrayData.length + 1))
    setArrayData(prev => {
      const next = [...prev]
      next.splice(index, 0, newValue)
      return next
    })
  }

  const removeAtRandom = () => {
    if (arrayData.length === 0) return
    const index = Math.floor(Math.random() * arrayData.length)
    setArrayData(prev => {
      const next = [...prev]
      next.splice(index, 1)
      return next
    })
  }

  const updateRandom = () => {
    if (arrayData.length === 0) return
    const index = Math.floor(Math.random() * arrayData.length)
    const newValue = Math.floor(Math.random() * 100)
    setArrayData(prev => {
      const next = [...prev]
      next[index] = newValue
      return next
    })
  }

  const movePointers = () => {
    setPointers(prev => prev.map(p => {
      // Randomly move pointer -1, 0, or +1, keeping within bounds
      let newIndex = p.index + (Math.floor(Math.random() * 3) - 1)
      if (newIndex < 0) newIndex = 0
      if (newIndex >= arrayData.length) newIndex = arrayData.length - 1
      return { ...p, index: newIndex }
    }))
  }

  const reset = () => {
    setArrayData([10, 20, 30, 40, 50])
    setPointers([
      { index: 0, label: 'i', color: '#3b82f6' },
      { index: 4, label: 'j', color: '#10b981' }
    ])
    setActiveIndices([])
  }

  const toggleActive = () => {
    if (arrayData.length === 0) return
    const index = Math.floor(Math.random() * arrayData.length)
    setActiveIndices(prev => {
      if (prev.includes(index)) return prev.filter(i => i !== index)
      return [...prev, index]
    })
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Array Visualization</h1>
        <p className="text-muted-foreground mt-2">
          Interactive playground to visualize Array operations and pointers.
        </p>
      </div>

      <Card className="w-full border-none shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Interactive Demo</CardTitle>
          <CardDescription>
            Manipulate the array and observe smooth transitions and pointer movements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          <div className="flex flex-wrap gap-2">
            <Button onClick={pushItem} variant="default" size="sm">
              Push
            </Button>
            <Button onClick={popItem} variant="destructive" size="sm">
              Pop
            </Button>
            <Button onClick={insertAtRandom} variant="secondary" size="sm">
              Insert Random
            </Button>
            <Button onClick={removeAtRandom} variant="destructive" size="sm">
              Remove Random
            </Button>
            <Button onClick={updateRandom} variant="outline" size="sm">
              Update Value
            </Button>
            <Button onClick={movePointers} variant="default" size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              Move Pointers
            </Button>
            <Button onClick={toggleActive} variant="ghost" size="sm" className="border">
              Toggle Active
            </Button>
            <Button onClick={reset} variant="ghost" size="sm">
              Reset
            </Button>
          </div>

          <LiveArrayView
            data={arrayData}
            title="Current Array"
            pointers={pointers}
            activeIndices={activeIndices}
            highlightDuration={500}
          />

          <div className="text-sm text-muted-foreground space-y-1 border-t pt-4">
            <p>💡 <strong>Features:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Pointers:</strong> Multiple pointers (i, j) can exist and overlap.</li>
              <li><strong>Animations:</strong> Value updates highlight in blue.</li>
              <li><strong>States:</strong> Active elements (border/scale) and Deleting states.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
