import { MapDemo } from "@/components/visualizer/MapDemo"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Star Node</h1>
        <p className="text-muted-foreground">算法与数据结构可视化学习</p>
      </div>
      
      <MapDemo />
    </div>
  )
}
