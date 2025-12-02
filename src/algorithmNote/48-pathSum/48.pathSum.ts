export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}

export function pathSum(root: TreeNode | null, targetSum: number): number {
  const prefixSumMap = new Map<number, number>();
  // Initialize with 0 sum having 1 count (for paths starting from root)
  prefixSumMap.set(0, 1);
  
  return dfs(root, 0, targetSum, prefixSumMap);
}

function dfs(node: TreeNode | null, currentSum: number, targetSum: number, prefixSumMap: Map<number, number>): number {
  if (!node) {
    return 0;
  }

  currentSum += node.val;
  
  // The number of paths that end at the current node and sum to targetSum
  // is equal to the number of times (currentSum - targetSum) has occurred as a prefix sum.
  let count = prefixSumMap.get(currentSum - targetSum) || 0;

  // Update the map with the current sum
  prefixSumMap.set(currentSum, (prefixSumMap.get(currentSum) || 0) + 1);

  // Recursively process children
  count += dfs(node.left, currentSum, targetSum, prefixSumMap);
  count += dfs(node.right, currentSum, targetSum, prefixSumMap);

  // Backtrack: remove the current sum from the map so it doesn't affect other branches
  prefixSumMap.set(currentSum, (prefixSumMap.get(currentSum) || 0) - 1);

  return count;
}
