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

export function diameterOfBinaryTree(root: TreeNode | null): number {
    let ans = 0;

    function depth(node: TreeNode | null): number {
        if (node === null) {
            return 0;
        }
        const L = depth(node.left);
        const R = depth(node.right);
        ans = Math.max(ans, L + R);
        return Math.max(L, R) + 1;
    }

    depth(root);
    return ans;
}
