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

export function levelOrder(root: TreeNode | null): number[][] {
    const res: number[][] = [];
    if (!root) {
        return res;
    }

    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const currentLevelSize = queue.length;
        const currentLevel: number[] = [];

        for (let i = 0; i < currentLevelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        res.push(currentLevel);
    }

    return res;
}
