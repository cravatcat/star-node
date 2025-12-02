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
import reverseKGroupMd from "@/algorithmNote/31-reverseKGroup/31.reverseKGroup.md?raw"
import copyRandomListMd from "@/algorithmNote/32-copyRandomList/32.copyRandomList.md?raw"
import sortListMd from "@/algorithmNote/33-sortList/33.sortList.md?raw"
import mergeKListsMd from "@/algorithmNote/34-mergeKLists/34.mergeKLists.md?raw"
import LRUCacheMd from "@/algorithmNote/35-LRUCache/35.LRUCache.md?raw"
import inorderTraversalMd from "@/algorithmNote/36-inorderTraversal/36.inorderTraversal.md?raw"
import maxDepthMd from "@/algorithmNote/37-maxDepth/37.maxDepth.md?raw"
import invertTreeMd from "@/algorithmNote/38-invertTree/38.invertTree.md?raw"
import isSymmetricMd from "@/algorithmNote/39-isSymmetric/39.isSymmetric.md?raw"
import diameterOfBinaryTreeMd from "@/algorithmNote/40-diameterOfBinaryTree/40.diameterOfBinaryTree.md?raw"
import levelOrderMd from "@/algorithmNote/41-levelOrder/41.levelOrder.md?raw"
import sortedArrayToBSTMd from "@/algorithmNote/42-sortedArrayToBST/42.sortedArrayToBST.md?raw"
import isValidBSTMd from "@/algorithmNote/43-isValidBST/43.isValidBST.md?raw"
import kthSmallestMd from "@/algorithmNote/44-kthSmallest/44.kthSmallest.md?raw"
import rightSideViewMd from "@/algorithmNote/45-rightSideView/45.rightSideView.md?raw"
import flattenMd from "@/algorithmNote/46-flatten/46.flatten.md?raw"
import buildTreeMd from "@/algorithmNote/47-buildTree/47.buildTree.md?raw"
import pathSumMd from "@/algorithmNote/48-pathSum/48.pathSum.md?raw"
import lowestCommonAncestorMd from "@/algorithmNote/49-lowestCommonAncestor/49.lowestCommonAncestor.md?raw"
import maxPathSumMd from "@/algorithmNote/50-maxPathSum/50.maxPathSum.md?raw"
import numIslandsMd from "@/algorithmNote/51-numIslands/51.numIslands.md?raw"
import orangesRottingMd from "@/algorithmNote/52-orangesRotting/52.orangesRotting.md?raw"
import courseScheduleMd from "@/algorithmNote/53-courseSchedule/53.courseSchedule.md?raw"
import trieMd from "@/algorithmNote/54-trie/54.trie.md?raw"
import permutationsMd from "@/algorithmNote/55-permutations/55.permutations.md?raw"
import subsetsMd from "@/algorithmNote/56-subsets/56.subsets.md?raw"
import combinationSumMd from "@/algorithmNote/57-combinationSum/57.combinationSum.md?raw"
import letterCombinationsMd from "@/algorithmNote/58-letterCombinations/58.letterCombinations.md?raw"
import generateParenthesisMd from "@/algorithmNote/59-generateParenthesis/59.generateParenthesis.md?raw"
import wordSearchMd from "@/algorithmNote/60-wordSearch/60.wordSearch.md?raw"
import partitionMd from "@/algorithmNote/61-partition/61.partition.md?raw"
import solveNQueensMd from "@/algorithmNote/62-solveNQueens/62.solveNQueens.md?raw"
import searchMatrix63Md from "@/algorithmNote/63-searchMatrix/63.searchMatrix.md?raw"
import searchRotatedMd from "@/algorithmNote/64-searchRotated/64.searchRotated.md?raw"
import searchRangeMd from "@/algorithmNote/65-searchRange/65.searchRange.md?raw"
import findMinMd from "@/algorithmNote/66-findMin/66.findMin.md?raw"
import findMedianSortedArraysMd from "@/algorithmNote/67-findMedianSortedArrays/67.findMedianSortedArrays.md?raw"
import validParenthesesMd from "@/algorithmNote/68-validParentheses/68.validParentheses.md?raw"
import dailyTemperaturesMd from "@/algorithmNote/69-dailyTemperatures/69.dailyTemperatures.md?raw"
import largestRectangleAreaMd from "@/algorithmNote/70-largestRectangleArea/70.largestRectangleArea.md?raw"
import maximalRectangleMd from "@/algorithmNote/71-maximalRectangle/71.maximalRectangle.md?raw"
import minStackMd from "@/algorithmNote/72-minStack/72.minStack.md?raw"
import decodeStringMd from "@/algorithmNote/73-decodeString/73.decodeString.md?raw"
import topKFrequentMd from "@/algorithmNote/74-topKFrequent/74.topKFrequent.md?raw"
import findKthLargestMd from "@/algorithmNote/75-findKthLargest/75.findKthLargest.md?raw"
import medianFinderMd from "@/algorithmNote/76-medianFinder/76.medianFinder.md?raw"
import maxProfitMd from "@/algorithmNote/77-maxProfit/77.maxProfit.md?raw"
import jumpGameMd from "@/algorithmNote/78-jumpGame/78.jumpGame.md?raw"
import jumpGameIIMd from "@/algorithmNote/79-jumpGameII/79.jumpGameII.md?raw"
import uniquePathsMd from "@/algorithmNote/80-uniquePaths/80.uniquePaths.md?raw"
import minPathSumMd from "@/algorithmNote/81-minPathSum/81.minPathSum.md?raw"
import longestPalindromeMd from "@/algorithmNote/82-longestPalindrome/82.longestPalindrome.md?raw"
import lengthOfLISMd from "@/algorithmNote/83-lengthOfLIS/83.lengthOfLIS.md?raw"
import coinChangeMd from "@/algorithmNote/84-coinChange/84.coinChange.md?raw"
import wordBreakMd from "@/algorithmNote/85-wordBreak/85.wordBreak.md?raw"
import canPartitionMd from "@/algorithmNote/86-canPartition/86.canPartition.md?raw"
import robMd from "@/algorithmNote/87-rob/87.rob.md?raw"
import maxProductMd from "@/algorithmNote/88-maxProduct/88.maxProduct.md?raw"
import longestValidParenthesesMd from "@/algorithmNote/89-longestValidParentheses/89.longestValidParentheses.md?raw"
import minDistanceMd from "@/algorithmNote/90-minDistance/90.minDistance.md?raw"
import maximalSquareMd from "@/algorithmNote/91-maximalSquare/91.maximalSquare.md?raw"
import numSquaresMd from "@/algorithmNote/92-numSquares/92.numSquares.md?raw"
import singleNumberMd from "@/algorithmNote/93-singleNumber/93.singleNumber.md?raw"
import majorityElementMd from "@/algorithmNote/94-majorityElement/94.majorityElement.md?raw"
import sortColorsMd from "@/algorithmNote/95-sortColors/95.sortColors.md?raw"
import nextPermutationMd from "@/algorithmNote/96-nextPermutation/96.nextPermutation.md?raw"
import findDuplicateMd from "@/algorithmNote/97-findDuplicate/97.findDuplicate.md?raw"
import mergeTreesMd from "@/algorithmNote/98-mergeTrees/98.mergeTrees.md?raw"
import hammingDistanceMd from "@/algorithmNote/99-hammingDistance/99.hammingDistance.md?raw"
import countBitsMd from "@/algorithmNote/100-countBits/100.countBits.md?raw"


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
  },
  {
    id: "31",
    title: "K 个一组翻转链表",
    content: reverseKGroupMd
  },
  {
    id: "32",
    title: "随机链表的复制",
    content: copyRandomListMd
  },
  {
    id: "33",
    title: "排序链表",
    content: sortListMd
  },
  {
    id: "34",
    title: "合并 K 个升序链表",
    content: mergeKListsMd
  },
  {
    id: "35",
    title: "LRU 缓存",
    content: LRUCacheMd
  },
  {
    id: "36",
    title: "二叉树的中序遍历",
    content: inorderTraversalMd
  },
  {
    id: "37",
    title: "二叉树的最大深度",
    content: maxDepthMd
  },
  {
    id: "38",
    title: "翻转二叉树",
    content: invertTreeMd
  },
  {
    id: "39",
    title: "对称二叉树",
    content: isSymmetricMd
  },
  {
    id: "40",
    title: "二叉树的直径",
    content: diameterOfBinaryTreeMd
  },
  {
    id: "41",
    title: "二叉树的层序遍历",
    content: levelOrderMd
  },
  {
    id: "42",
    title: "将有序数组转换为二叉搜索树",
    content: sortedArrayToBSTMd
  },
  {
    id: "43",
    title: "验证二叉搜索树",
    content: isValidBSTMd
  },
  {
    id: "44",
    title: "二叉搜索树中第 K 小的元素",
    content: kthSmallestMd
  },
  {
    id: "45",
    title: "二叉树的右视图",
    content: rightSideViewMd
  },
  {
    id: "46",
    title: "二叉树展开为链表",
    content: flattenMd
  },
  {
    id: "47",
    title: "从前序与中序遍历序列构造二叉树",
    content: buildTreeMd
  },
  {
    id: "48",
    title: "路径总和 III",
    content: pathSumMd
  },
  {
    id: "49",
    title: "二叉树的最近公共祖先",
    content: lowestCommonAncestorMd
  },
  {
    id: "50",
    title: "二叉树中的最大路径和",
    content: maxPathSumMd
  },
  {
    id: "51",
    title: "岛屿数量",
    content: numIslandsMd
  },
  {
    id: "52",
    title: "腐烂的橘子",
    content: orangesRottingMd
  },
  {
    id: "53",
    title: "课程表",
    content: courseScheduleMd
  },
  {
    id: "54",
    title: "实现 Trie (前缀树)",
    content: trieMd
  },
  {
    id: "55",
    title: "全排列",
    content: permutationsMd
  },
  {
    id: "56",
    title: "子集",
    content: subsetsMd
  },
  {
    id: "57",
    title: "组合总和",
    content: combinationSumMd
  },
  {
    id: "58",
    title: "电话号码的字母组合",
    content: letterCombinationsMd
  },
  {
    id: "59",
    title: "括号生成",
    content: generateParenthesisMd
  },
  {
    id: "60",
    title: "单词搜索",
    content: wordSearchMd
  },
  {
    id: "61",
    title: "分割回文串",
    content: partitionMd
  },
  {
    id: "62",
    title: "N 皇后",
    content: solveNQueensMd
  },
  {
    id: "63",
    title: "搜索二维矩阵",
    content: searchMatrix63Md
  },
  {
    id: "64",
    title: "搜索旋转排序数组",
    content: searchRotatedMd
  },
  {
    id: "65",
    title: "在排序数组中查找元素的第一个和最后一个位置",
    content: searchRangeMd
  },
  {
    id: "66",
    title: "寻找旋转排序数组中的最小值",
    content: findMinMd
  },
  {
    id: "67",
    title: "寻找两个正序数组的中位数",
    content: findMedianSortedArraysMd
  },
  {
    id: "68",
    title: "有效的括号",
    content: validParenthesesMd
  },
  {
    id: "69",
    title: "每日温度",
    content: dailyTemperaturesMd
  },
  {
    id: "70",
    title: "柱状图中最大的矩形",
    content: largestRectangleAreaMd
  },
  {
    id: "71",
    title: "最大矩形",
    content: maximalRectangleMd
  },
  {
    id: "72",
    title: "最小栈",
    content: minStackMd
  },
  {
    id: "73",
    title: "字符串解码",
    content: decodeStringMd
  },
  {
    id: "74",
    title: "前 K 个高频元素",
    content: topKFrequentMd
  },
  {
    id: "75",
    title: "数组中的第K个最大元素",
    content: findKthLargestMd
  },
  {
    id: "76",
    title: "数据流的中位数",
    content: medianFinderMd
  },
  {
    id: "77",
    title: "买卖股票的最佳时机",
    content: maxProfitMd
  },
  {
    id: "78",
    title: "跳跃游戏",
    content: jumpGameMd
  },
  {
    id: "79",
    title: "跳跃游戏 II",
    content: jumpGameIIMd
  },
  {
    id: "80",
    title: "不同路径",
    content: uniquePathsMd
  },
  {
    id: "81",
    title: "最小路径和",
    content: minPathSumMd
  },
  {
    id: "82",
    title: "最长回文子串",
    content: longestPalindromeMd
  },
  {
    id: "83",
    title: "最长递增子序列",
    content: lengthOfLISMd
  },
  {
    id: "84",
    title: "零钱兑换",
    content: coinChangeMd
  },
  {
    id: "85",
    title: "单词拆分",
    content: wordBreakMd
  },
  {
    id: "86",
    title: "分割等和子集",
    content: canPartitionMd
  },
  {
    id: "87",
    title: "打家劫舍",
    content: robMd
  },
  {
    id: "88",
    title: "乘积最大子数组",
    content: maxProductMd
  },
  {
    id: "89",
    title: "最长有效括号",
    content: longestValidParenthesesMd
  },
  {
    id: "90",
    title: "编辑距离",
    content: minDistanceMd
  },
  {
    id: "91",
    title: "最大正方形",
    content: maximalSquareMd
  },
  {
    id: "92",
    title: "完全平方数",
    content: numSquaresMd
  },
  {
    id: "93",
    title: "只出现一次的数字",
    content: singleNumberMd
  },
  {
    id: "94",
    title: "多数元素",
    content: majorityElementMd
  },
  {
    id: "95",
    title: "颜色分类",
    content: sortColorsMd
  },
  {
    id: "96",
    title: "下一个排列",
    content: nextPermutationMd
  },
  {
    id: "97",
    title: "寻找重复数",
    content: findDuplicateMd
  },
  {
    id: "98",
    title: "合并二叉树",
    content: mergeTreesMd
  },
  {
    id: "99",
    title: "汉明距离",
    content: hammingDistanceMd
  },
  {
    id: "100",
    title: "比特位计数",
    content: countBitsMd
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
