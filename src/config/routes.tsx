import { lazy } from "react"

const IndexPage = lazy(() => import("@/pages/IndexPage"))
const DataStructuresPage = lazy(() => import("@/pages/DataStructuresPage"))
const AlgorithmPage = lazy(() => import("@/pages/AlgorithmPage"))
const ReactBookPage = lazy(() => import("@/pages/ReactBookPage"))

export interface RouteConfig {
  path: string
  label: string
  element: React.ReactNode
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    label: "首页",
    element: <IndexPage />,
  },
  {
    path: "/datastructures/*",
    label: "数据结构",
    element: <DataStructuresPage />,
  },
  {
    path: "/algorithm/*",
    label: "算法100",
    element: <AlgorithmPage />,
  },
  {
    path: "/operatingsystem/*",
    label: "操作系统",
    element: null,
  },
  {
    path: "/llm/*",
    label: "大模型",
    element: null,
  },
  {
    path: "/reactbook",
    label: 'React "OS"',
    element: <ReactBookPage />,
  },
]
