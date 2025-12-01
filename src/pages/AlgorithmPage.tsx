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
import spiralOrderMd from "@/algorithmNote/19-spiralOrder/19.spiralOrder.md?raw"
import rotateImageMd from "@/algorithmNote/20-rotate/20.rotate.md?raw"
import searchMatrixMd from "@/algorithmNote/21-searchMatrix/21.searchMatrix.md?raw"
import getIntersectionNodeMd from "@/algorithmNote/22-getIntersectionNode/22.getIntersectionNode.md?raw"
import reverseListMd from "@/algorithmNote/23-reverseList/23.reverseList.md?raw"
import isPalindromeMd from "@/algorithmNote/24-isPalindrome/24.isPalindrome.md?raw"
import hasCycleMd from "@/algorithmNote/25-hasCycle/25.hasCycle.md?raw"
import detectCycleMd from "@/algorithmNote/26-detectCycle/26.detectCycle.md?raw"
import mergeTwoListsMd from "@/algorithmNote/27-mergeTwoLists/27.mergeTwoLists.md?raw"
import addTwoNumbersMd from "@/algorithmNote/28-addTwoNumbers/28.addTwoNumbers.md?raw"
import removeNthFromEndMd from "@/algorithmNote/29-removeNthFromEnd/29.removeNthFromEnd.md?raw"
import swapPairsMd from "@/algorithmNote/30-swapPairs/30.swapPairs.md?raw"


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
  },
  {
    id: "19",
    title: "螺旋矩阵",
    content: spiralOrderMd
  },
  {
    id: "20",
    title: "旋转图像",
    content: rotateImageMd
  },
  {
    id: "21",
    title: "搜索二维矩阵 II",
    content: searchMatrixMd
  },
  {
    id: "22",
    title: "相交链表",
    content: getIntersectionNodeMd
  },
  {
    id: "23",
    title: "反转链表",
    content: reverseListMd
  },
  {
    id: "24",
    title: "回文链表",
    content: isPalindromeMd
  },
  {
    id: "25",
    title: "环形链表",
    content: hasCycleMd
  },
  {
    id: "26",
    title: "环形链表 II",
    content: detectCycleMd
  },
  {
    id: "27",
    title: "合并两个有序链表",
    content: mergeTwoListsMd
  },
  {
    id: "28",
    title: "两数相加",
    content: addTwoNumbersMd
  },
  {
    id: "29",
    title: "删除链表的倒数第 N 个结点",
    content: removeNthFromEndMd
  },
  {
    id: "30",
    title: "两两交换链表中的节点",
    content: swapPairsMd
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
