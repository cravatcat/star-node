import { Navigate, Route, Routes } from "react-router-dom"
import { DocLayout } from "@/layouts/DocLayout"
import { Sidebar } from "@/components/Sidebar"
import { MapDisplay } from "@/visiualizerDisplay/MapDisplay"
import { ArrayDisplay } from "@/visiualizerDisplay/ArrayDisplay"
import { useUpdateLastVisited, getLastVisited } from "@/hooks/useLastVisited"

// Data Structure items configuration
const items = [
  {
    id: "map",
    title: "Map (映射)",
    href: "/datastructures/map",
    component: <MapDisplay />
  },
  {
    id: "array",
    title: "Array (数组)",
    href: "/datastructures/array",
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

function DataStructureView({ component, id }: { component: React.ReactNode; id: string }) {
  useUpdateLastVisited("last-visited-datastructure", id)
  return (
    <DocLayout sidebar={<Sidebar title="数据结构" items={sidebarItems} />}>
      {component}
    </DocLayout>
  )
}

export default function DataStructuresPage() {
  const lastVisited = getLastVisited("last-visited-datastructure", "map")
  
  return (
    <Routes>
      <Route index element={<Navigate to={`/datastructures/${lastVisited}`} replace />} />
      {items.map(item => (
        <Route 
          key={item.id} 
          path={item.id} 
          element={<DataStructureView component={item.component} id={item.id} />} 
        />
      ))}
      {/* Catch all redirect to last visited */}
      <Route path="*" element={<Navigate to={`/datastructures/${lastVisited}`} replace />} />
    </Routes>
  )
}
