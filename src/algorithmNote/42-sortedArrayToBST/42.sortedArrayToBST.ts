/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

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

export function sortedArrayToBST(nums: number[]): TreeNode | null {
    if (nums.length === 0) {
        return null;
    }
    return buildBST(nums, 0, nums.length - 1);
}

function buildBST(nums: number[], left: number, right: number): TreeNode | null {
    if (left > right) {
        return null;
    }

    // 选择中间位置左边的数字作为根节点 (总是选择中间位置的元素也可以)
    const mid = Math.floor((left + right) / 2);
    const root = new TreeNode(nums[mid]);

    root.left = buildBST(nums, left, mid - 1);
    root.right = buildBST(nums, mid + 1, right);

    return root;
}
