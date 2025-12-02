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

export function rightSideView(root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) {
    return res;
  }

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const size = queue.length;
    
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      
      // If it's the last node in the current level, add to result
      if (i === size - 1) {
        res.push(node.val);
      }
      
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  
  return res;
}
