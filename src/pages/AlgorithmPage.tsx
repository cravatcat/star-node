import { Navigate, Route, Routes, useParams } from "react-router-dom"
import { MarkdownPreview } from "@/components/markdown/MarkdownPreview"
import { TableOfContents } from "@/components/TableOfContents"
import { DocLayout } from "@/layouts/DocLayout"
import { Sidebar } from "@/components/Sidebar"
import { useUpdateLastVisited, getLastVisited } from "@/hooks/useLastVisited"

// 导入 Markdown 文件
import twoSumMd from "@/algorithmNote/1-twoSum/1.twoSum.md?raw"
import groupAnagramsMd from "@/algorithmNote/2-groupAnagrams/2.groupAnagrams.md?raw"
import longestConsecutiveMd from "@/algorithmNote/3-longestConsecutive/3.longestConsecutive.md?raw"
import moveZeroesMd from "@/algorithmNote/4-moveZeroes/4.moveZeroes.md?raw"
import maxAreaMd from "@/algorithmNote/5-maxArea/5.maxArea.md?raw"
import threeSumMd from "@/algorithmNote/6-threeSum/6.threeSum.md?raw"
import trapMd from "@/algorithmNote/7-trap/7.trap.md?raw"
import lengthOfLongestSubstringMd from "@/algorithmNote/8-lengthOfLongestSubstring/8.lengthOfLongestSubstring.md?raw"
import findAnagramsMd from "@/algorithmNote/9-findAnagrams/9.findAnagrams.md?raw"
import subarraySumMd from "@/algorithmNote/10-subarraySum/10.subarraySum.md?raw"
import maxSlidingWindowMd from "@/algorithmNote/11-maxSlidingWindow/11.maxSlidingWindow.md?raw"
import minWindowMd from "@/algorithmNote/12-minWindow/12.minWindow.md?raw"
import maxSubArrayMd from "@/algorithmNote/13-maxSubArray/13.maxSubArray.md?raw"
import mergeMd from "@/algorithmNote/14-merge/14.merge.md?raw"
import rotateMd from "@/algorithmNote/15-rotate/15.rotate.md?raw"
import productExceptSelfMd from "@/algorithmNote/16-productExceptSelf/16.productExceptSelf.md?raw"
import firstMissingPositiveMd from "@/algorithmNote/17-firstMissingPositive/17.firstMissingPositive.md?raw"
import setZeroesMd from "@/algorithmNote/18-setZeroes/18.setZeroes.md?raw"


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
  },
  {
    id: "5",
    title: "盛最多水的容器",
    content: maxAreaMd
  },
  {
    id: "6",
    title: "三数之和",
    content: threeSumMd
  },
  {
    id: "7",
    title: "接雨水",
    content: trapMd
  },
  {
    id: "8",
    title: "无重复字符的最长子串",
    content: lengthOfLongestSubstringMd
  },
  {
    id: "9",
    title: "找到字符串中所有字母异位词",
    content: findAnagramsMd
  },
  {
    id: "10",
    title: "和为 K 的子数组",
    content: subarraySumMd
  },
  {
    id: "11",
    title: "滑动窗口最大值",
    content: maxSlidingWindowMd
  },
  {
    id: "12",
    title: "最小覆盖子串",
    content: minWindowMd
  },
  {
    id: "13",
    title: "最大子数组和",
    content: maxSubArrayMd
  },
  {
    id: "14",
    title: "合并区间",
    content: mergeMd
  },
  {
    id: "15",
    title: "轮转数组",
    content: rotateMd
  },
  {
    id: "16",
    title: "除自身以外数组的乘积",
    content: productExceptSelfMd
  },
  {
    id: "17",
    title: "缺失的第一个正数",
    content: firstMissingPositiveMd
  },
  {
    id: "18",
    title: "矩阵置零",
    content: setZeroesMd
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
