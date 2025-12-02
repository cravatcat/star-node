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

export function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let current = root;
  let count = 0;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    
    current = stack.pop()!;
    count++;
    
    if (count === k) {
      return current.val;
    }
    
    current = current.right;
  }
  
  return -1; // Should not be reached if k is valid
}
