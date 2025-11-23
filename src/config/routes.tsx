import { lazy } from "react"

const HomePage = lazy(() => import("@/pages/HomePage"))
const AlgorithmPage = lazy(() => import("@/pages/AlgorithmPage"))
const ReactBookPage = lazy(() => import("@/pages/ReactBookPage"))

export interface RouteConfig {
  path: string
  label: string
  element: React.ReactNode
}

export const routes: RouteConfig[] = [
  {
    path: "/*",
    label: "数据结构",
    element: <HomePage />,
  },
  {
    path: "/algorithm/*",
    label: "算法",
    element: <AlgorithmPage />,
  },
  {
    path: "/reactbook",
    label: "react-book",
    element: <ReactBookPage />,
  },
]
