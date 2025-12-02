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

export function maxPathSum(root: TreeNode | null): number {
  let maxSum = -Infinity;

  function maxGain(node: TreeNode | null): number {
    if (!node) {
      return 0;
    }

    // Recursively calculate max gain from left and right subtrees
    // If gain is negative, we ignore it (take 0)
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);

    // Calculate the path sum passing through the current node
    const priceNewPath = node.val + leftGain + rightGain;

    // Update global max sum
    maxSum = Math.max(maxSum, priceNewPath);

    // Return the max gain the current node can contribute to its parent
    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}
