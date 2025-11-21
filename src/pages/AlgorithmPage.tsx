import { Link, Route, Routes, useParams, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { MarkdownPreview } from "@/components/markdown/MarkdownPreview"
import { TableOfContents } from "@/components/TableOfContents"

// 导入 Markdown 文件
import twoSumMd from "@/algorithmNote/ 1-twoSum/1.twoSum.md?raw"
import groupAnagramsMd from "@/algorithmNote/2-groupAnagrams/2.groupAnagrams.md?raw"

// 题目数据配置
const problems = [
  {
    id: "1",
    title: "两数之和",
    content: twoSumMd
  },
  {
    id: "2",
    title: "字母异位词分组",
    content: groupAnagramsMd
  }
]

const allProblems = [...problems]

function AlgorithmProblem() {
  const { id } = useParams()
  const problem = allProblems.find(p => p.id === id)

  if (!problem) {
    return <div>题目未找到</div>
  }

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <MarkdownPreview content={problem.content} />
      </div>
      <aside className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-24">
          <TableOfContents content={problem.content} />
        </div>
      </aside>
    </div>
  )
}

function AlgorithmList() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 rounded-lg p-8 text-center animate-in fade-in-50">
      <div className="rounded-full bg-muted p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 text-muted-foreground"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">准备好开始学习了吗？</h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          请从左侧列表中选择一道算法题目，查看详细的题解分析和代码实现。
        </p>
      </div>
    </div>
  )
}

export default function AlgorithmPage() {
  const location = useLocation()

  return (
    <div className="flex gap-8">
      {/* 左侧侧边栏 */}
      <aside className="w-64 shrink-0">
        <div className="sticky top-24">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">题目列表</h2>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="flex flex-col gap-1 pr-4">
              {allProblems.map((problem) => {
                const isActive = location.pathname === `/algorithm/${problem.id}`
                return (
                  <Link key={problem.id} to={`/algorithm/${problem.id}`}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start font-normal truncate",
                        isActive && "font-medium"
                      )}
                      title={problem.title}
                    >
                      <span className="truncate">
                        {problem.id}. {problem.title}
                      </span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* 右侧内容区 */}
      <div className="flex-1 min-w-0">
        <Routes>
          <Route index element={<AlgorithmList />} />
          <Route path=":id" element={<AlgorithmProblem />} />
        </Routes>
      </div>
    </div>
  )
}
