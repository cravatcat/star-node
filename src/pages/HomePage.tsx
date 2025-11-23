import { Navigate, Route, Routes } from "react-router-dom"
import { DocLayout } from "@/layouts/DocLayout"
import { Sidebar } from "@/components/Sidebar"
import { MapDisplay } from "@/visiualizerDisplay/MapDisplay"
import { ArrayDisplay } from "@/visiualizerDisplay/ArrayDisplay"

// Data Structure items configuration
const items = [
  {
    id: "map",
    title: "Map (映射)",
    href: "/map",
    component: <MapDisplay />
  },
  {
    id: "array",
    title: "Array (数组)",
    href: "/array",
    component: <ArrayDisplay />
  }
]

// Transform for Sidebar
const sidebarItems = items.map(item => ({
  id: item.id,
  label: item.title,
  href: item.href,
  title: item.title
}))

function DataStructureView({ component }: { component: React.ReactNode }) {
  return (
    <DocLayout sidebar={<Sidebar title="数据结构" items={sidebarItems} />}>
      {component}
    </DocLayout>
  )
}

function WelcomeView() {
  return (
    <DocLayout sidebar={<Sidebar title="数据结构" items={sidebarItems} />}>
      <div className="flex h-full flex-col items-center justify-center space-y-4 rounded-lg p-8 text-center animate-in fade-in-50">
        <div className="rounded-full bg-muted p-4">
          <span className="text-4xl">🧩</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Data Structure Visualization</h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Select a data structure from the sidebar to interact with its visualization playground.
          </p>
        </div>
      </div>
    </DocLayout>
  )
}

export default function HomePage() {
  return (
    <Routes>
      <Route index element={<WelcomeView />} />
      {items.map(item => (
        <Route 
          key={item.id} 
          path={item.id} 
          element={<DataStructureView component={item.component} />} 
        />
      ))}
      {/* Catch all redirect to welcome or first item */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
