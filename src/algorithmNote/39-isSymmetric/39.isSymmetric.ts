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

export function isSymmetric(root: TreeNode | null): boolean {
    if (root === null) return true;
    return check(root.left, root.right);
}

function check(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) return true;
    if (p === null || q === null) return false;
    return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
}
