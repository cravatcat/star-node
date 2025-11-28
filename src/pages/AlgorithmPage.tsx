import { Navigate, Route, Routes, useParams } from "react-router-dom"
import { MarkdownPreview } from "@/components/markdown/MarkdownPreview"
import { TableOfContents } from "@/components/TableOfContents"
import { DocLayout } from "@/layouts/DocLayout"
import { Sidebar } from "@/components/Sidebar"
import { useUpdateLastVisited, getLastVisited } from "@/hooks/useLastVisited"

// 导入 Markdown 文件
import twoSumMd from "@/algorithmNote/ 1-twoSum/1.twoSum.md?raw"
import groupAnagramsMd from "@/algorithmNote/2-groupAnagrams/2.groupAnagrams.md?raw"
import longestConsecutiveMd from "@/algorithmNote/3-longestConsecutive/3.longestConsecutive.md?raw"
import moveZeroesMd from "@/algorithmNote/4-moveZeroes/4.moveZeroes.md?raw"


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
  },
  {
    id: "3",
    title: "最长连续序列",
    content: longestConsecutiveMd
  },
  {
    id: "4",
    title: "移动零",
    content: moveZeroesMd
  }
]

const allProblems = [...problems]

// 转换为 Sidebar 需要的数据格式
const sidebarItems = allProblems.map(problem => ({
  id: problem.id,
  label: `${problem.id}. ${problem.title}`,
  href: `/algorithm/${problem.id}`,
  title: problem.title
}))

function AlgorithmProblem() {
  const { id } = useParams()
  const problem = allProblems.find(p => p.id === id)

  useUpdateLastVisited("last-visited-algorithm", id || "")

  if (!problem) {
    return (
      <DocLayout sidebar={<Sidebar title="题目列表" items={sidebarItems} />}>
        <div>题目未找到</div>
      </DocLayout>
    )
  }

  return (
    <DocLayout
      sidebar={<Sidebar title="题目列表" items={sidebarItems} />}
      toc={<TableOfContents content={problem.content} />}
    >
      <MarkdownPreview content={problem.content} />
    </DocLayout>
  )
}

export default function AlgorithmPage() {
  const lastVisited = getLastVisited("last-visited-algorithm", "1")
  console.log(123123, lastVisited)
  return (
    <Routes>
      <Route index element={<Navigate to={lastVisited} replace />} />
      <Route path=":id" element={<AlgorithmProblem />} />
    </Routes>
  )
}
